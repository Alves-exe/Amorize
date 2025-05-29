import { useEffect, useState, useCallback } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../services/AuthContext";

import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import CardProgress from "../components/CardProgress";
import BudgetControl from "../components/BudgetControl";
import DateWed from "../components/DateWed";
import Calendar from "../components/Calendar";
import { fetchConvidados } from "../api/api-convidados";
import { calcularProgresso } from "../utils/progressoHelper";
import TasksCardLocal from "../components/TasksCardLocal";
import BudgetSummary from "../components/BudgetSummary";
import ConvidadosPage from "../components/ConvidadosPage";
import Invites from "./Invites";
import Profile from "../components/Profile";

import {
  addTaskToFirestore,
  updateTaskInFirestore,
  deleteTaskFromFirestore,
  listenTasksRealtime,
} from "../api/api-tasks";

function Dashboard() {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [content, setContent] = useState(null);
  const [showProgress, setShowProgress] = useState(true);
  const [convidados, setConvidados] = useState([]);
  const [tarefasConcluidas, setTarefasConcluidas] = useState(0);
  const [totalTarefas, setTotalTarefas] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [orcamentoTotal, setOrcamentoTotal] = useState(0);
  const [tasks, setTasks] = useState([]);

  const tarefasPendentes = totalTarefas - tarefasConcluidas;

  // Escuta em tempo real as tarefas do usuário no Firestore
  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = listenTasksRealtime(currentUser.uid, (updatedTasks) => {
      setTasks(updatedTasks);
      const doneCount = updatedTasks.filter((t) => t.done).length;
      setTarefasConcluidas(doneCount);
      setTotalTarefas(updatedTasks.length);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Busca perfil do usuário no Firestore
  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser) return;

      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile({ ...docSnap.data(), id: currentUser.uid });
        } else {
          console.error("Perfil não encontrado no Firestore.");
        }
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      }
    };

    fetchProfile();
  }, [currentUser]);

  // Carrega despesas e orçamento do localStorage
  useEffect(() => {
    if (profile?.id) {
      const storedExpenses = localStorage.getItem(`budget_${profile.id}`);
      const storedTotal = localStorage.getItem(`total_budget_${profile.id}`);
      const expensesParsed = storedExpenses ? JSON.parse(storedExpenses) : [];
      setExpenses(expensesParsed);
      setOrcamentoTotal(storedTotal ? parseFloat(storedTotal) : 0);
    }
  }, [profile]);

  // Salva despesas e orçamento no localStorage
  useEffect(() => {
    if (profile?.id) {
      localStorage.setItem(`budget_${profile.id}`, JSON.stringify(expenses));
      localStorage.setItem(
        `total_budget_${profile.id}`,
        orcamentoTotal.toString()
      );
    }
  }, [expenses, orcamentoTotal, profile]);

  // Carrega convidados do perfil
  const carregarConvidados = useCallback(async () => {
    if (profile?.id) {
      const lista = await fetchConvidados(profile.id);
      setConvidados(lista || []);
    }
  }, [profile?.id]);

  useEffect(() => {
    if (profile) {
      carregarConvidados();
    }
  }, [profile, carregarConvidados]);

  // Funções para interação com as tarefas via Firestore
  const handleAddTask = async (task) => {
    if (!currentUser) return;
    await addTaskToFirestore(currentUser.uid, { ...task, done: false });
  };

  const handleToggleTask = async (task) => {
    if (!currentUser) return;
    await updateTaskInFirestore(currentUser.uid, task.id, { done: !task.done });
  };

  const handleDeleteTask = async (task) => {
    if (!currentUser) return;
    await deleteTaskFromFirestore(currentUser.uid, task.id);
  };

  const handleDashboardClick = () => {
    setShowProgress(true);
    setContent(null);
  };

  const resetAndSetContent = (newContent) => {
    setShowProgress(false);
    setContent(newContent);
  };

  const handleOrcamentoTotalChange = (novoTotal) => {
    setOrcamentoTotal(novoTotal);
  };

  const handleExpensesChange = (novasDespesas) => {
    setExpenses(novasDespesas);
  };

  const totalUsado = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const progressValue = calcularProgresso(
    convidados,
    orcamentoTotal,
    totalUsado,
    tarefasConcluidas,
    totalTarefas
  );

  if (!profile) {
    return (
      <p className="text-center mt-10 text-gray-600">
        Carregando dados do casal...
      </p>
    );
  }

  return (
    <div className="h-screen">
      <Sidebar
        setContent={resetAndSetContent}
        handleDashboardClick={handleDashboardClick}
        dateWed={profile?.weddingDate}
      />

      <div className="flex-col">
        <div className="mt-6 ml-6 items-center">
          <h2 className="text-3xl ml-3 font-bold text-black">
            Olá, {profile.partner1} e {profile.partner2}
          </h2>
          <p className="ml-3">
            <DateWed weddingDate={profile.weddingDate} />
          </p>
        </div>

        {showProgress && (
          <>
            <div className="flex justify-center mt-6">
              <div className="w-full max-w-5xl">
                <CardProgress
                  title="Progresso do Planejamento"
                  subtitle={`Você já completou ${progressValue}% das tarefas`}
                  progressValue={progressValue}
                  orcamentoTotal={orcamentoTotal}
                  tasks={tarefasPendentes}
                  convidadosConfirmados={
                    convidados.filter((c) => c.confirmado).length
                  }
                  totalConvidados={convidados.length}
                />
              </div>
            </div>
            <div className="flex justify-center gap-5 mt-10 flex-wrap">
              <Card
                title="Tarefas"
                content={
                  <TasksCardLocal
                    tasks={tasks}
                    onToggleTask={handleToggleTask}
                    onDeleteTask={handleDeleteTask}
                  />
                }
              />
              <Card
                title="Orçamento"
                content={
                  <BudgetSummary total={orcamentoTotal} usado={totalUsado} />
                }
              />
              <Card
                title="Mensagens Recentes"
                content="Verifique suas mensagens recentes."
              />
            </div>
          </>
        )}

        {!showProgress && content && (
          <div className="max-w-3xl mx-auto ">
            <h2 className="text-2xl font-bold text-rose-600">
              {content.title}
            </h2>
            <p className="text-gray-600 mt-2">{content.description}</p>

            {content.title === "Orçamento" && (
              <div className="mt-6">
                <BudgetControl
                  onBudgetTotalChange={handleOrcamentoTotalChange}
                  expenses={expenses}
                  setExpenses={handleExpensesChange}
                  orcamentoTotal={orcamentoTotal}
                  userId={profile?.id}
                />
              </div>
            )}

            {content?.calendar && (
              <Calendar tasks={tasks} onAddTask={handleAddTask} />
            )}

            {content.title === "Convites" && <Invites />}
            {content.title === "Perfil" && <Profile />}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
