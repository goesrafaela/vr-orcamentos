import { useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import {
  Calculator,
  Copy,
  FileText,
  Phone,
  Droplets,
  Download,
} from "lucide-react";

export default function App() {
  const [cliente, setCliente] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [servico, setServico] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [quantidade, setQuantidade] = useState("1");
  const [valorUnitario, setValorUnitario] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const total = useMemo(() => {
    const q = Number(quantidade) || 0;
    const v = Number(valorUnitario) || 0;
    return q * v;
  }, [quantidade, valorUnitario]);

  const totalFormatado = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const hoje = new Date().toLocaleDateString("pt-BR");

  const textoOrcamento = `
ORÇAMENTO - VR RESERVATÓRIOS

Data: ${hoje}

Cliente: ${cliente}
Telefone: ${telefone}
Endereço: ${endereco}

Serviço: ${servico}
Capacidade: ${capacidade}
Quantidade: ${quantidade}
Valor Unitário: R$ ${valorUnitario}

Valor Total: ${totalFormatado}

Observações:
${observacoes}
`;

  function copiarTexto() {
    navigator.clipboard.writeText(textoOrcamento);
    alert("Orçamento copiado!");
  }

  function gerarPDF() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("ORÇAMENTO - VR RESERVATÓRIOS", 10, 20);

    doc.setFontSize(12);

    const linhas = doc.splitTextToSize(textoOrcamento, 180);

    doc.text(linhas, 10, 40);

    doc.save("orcamento.pdf");
  }

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl bg-blue-700 p-6 text-white shadow-xl">
          <div className="flex items-center gap-3">
            <Droplets />
            <h1 className="text-3xl font-bold">VR Reservatórios</h1>
          </div>

          <p className="mt-2">Sistema de orçamento rápido</p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-2">
              <Calculator className="text-blue-700" />
              <h2 className="text-2xl font-bold">Dados do orçamento</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block font-medium text-slate-700">
                  Cliente
                </label>

                <input
                  className="w-full rounded-xl border p-3"
                  placeholder="Nome do cliente"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1 block font-medium text-slate-700">
                  Telefone
                </label>

                <input
                  type="tel"
                  inputMode="tel"
                  className="w-full rounded-xl border p-3"
                  placeholder="Telefone/WhatsApp"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1 block font-medium text-slate-700">
                  Endereço
                </label>

                <input
                  className="w-full rounded-xl border p-3"
                  placeholder="Rua, número e bairro"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1 block font-medium text-slate-700">
                  Serviço
                </label>

                <select
                  className="w-full rounded-xl border p-3"
                  value={servico}
                  onChange={(e) => setServico(e.target.value)}
                >
                  <option value="">Selecione o Serviço</option>

                  <option>Limpeza de caixa d'água</option>

                  <option>Limpeza de reservatório metálico</option>

                  <option>Reforma de reservatório metálico</option>

                  <option>Limpeza de poço caipira</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block font-medium text-slate-700">
                  Litragem
                </label>

                <input
                  inputMode="numeric"
                  className="w-full rounded-xl border p-3"
                  placeholder="Ex: 500L"
                  value={capacidade}
                  onChange={(e) => setCapacidade(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1 block font-medium text-slate-700">
                  Quantidade
                </label>

                <input
                  type="number"
                  inputMode="numeric"
                  className="w-full rounded-xl border p-3"
                  placeholder="Quantidade"
                  value={quantidade}
                  onChange={(e) => setQuantidade(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1 block font-medium text-slate-700">
                  Valor unitário
                </label>

                <input
                  type="number"
                  inputMode="decimal"
                  className="w-full rounded-xl border p-3"
                  placeholder="R$ 0,00"
                  value={valorUnitario}
                  onChange={(e) => setValorUnitario(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1 block font-medium text-slate-700">
                  Observações
                </label>

                <textarea
                  className="w-full rounded-xl border p-3"
                  rows={4}
                  placeholder="Digite observações adicionais"
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                />
              </div>

              <div className="rounded-2xl bg-blue-100 p-4">
                <p className="text-sm text-blue-700">Valor total</p>

                <p className="text-3xl font-bold text-blue-900">
                  {totalFormatado}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={copiarTexto}
                  className="flex items-center gap-2 rounded-2xl bg-blue-700 px-5 py-3 text-white hover:bg-blue-800"
                >
                  <Copy size={18} />
                  Copiar
                </button>

                <button
                  onClick={gerarPDF}
                  className="flex items-center gap-2 rounded-2xl bg-sky-500 px-5 py-3 text-white hover:bg-sky-600"
                >
                  <Download size={18} />
                  PDF
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-2">
              <FileText className="text-blue-700" />
              <h2 className="text-2xl font-bold">Prévia</h2>
            </div>

            <div className="whitespace-pre-wrap rounded-2xl border bg-slate-50 p-4">
              {textoOrcamento}
            </div>

            <div className="mt-6 flex items-center gap-2 text-blue-700">
              <Phone size={18} />
              (19) 98986-9948
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
