import { useState, useRef } from "react";
import { ClipboardList, Upload, Calendar, PenLine, X, Send, LibraryBig } from "lucide-react";
import LayoutBaseProf from "../../components/calendar/layout/LayoutBaseProf";
import InfoHeader from "../../components/escola/InfoHeader";

export default function PlanoAula() {
  const [modo, setModo] = useState('manual');
  const [arquivoSelecionado, setArquivoSelecionado] = useState<File | null>(null);
  const inputArquivoRef = useRef<HTMLInputElement>(null);

  // estados dos campos
  const [dataAula, setDataAula] = useState('');
  const [titulo, setTitulo] = useState('');
  const [detalhamento, setDetalhamento] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  async function handleEnviar() {
    setErro('');

    if (modo === 'manual') {
        if (!dataAula || !titulo || !detalhamento) {
        setErro('Preencha todos os campos.');
        return;
        }
    } else {
        if (!arquivoSelecionado) {
        setErro('Selecione um arquivo.');
        return;
        }
    }

    setCarregando(true);

    // simula delay de chamada à API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('Dados enviados:', modo === 'manual'
        ? { dataAula, titulo, detalhamento }
        : { arquivo: arquivoSelecionado?.name }
    );

    setCarregando(false);
    alert('Plano enviado com sucesso! (simulação)');
  }

  return (
    <LayoutBaseProf>
      <InfoHeader
        icon={<LibraryBig size={26}/>}
        title="Plano de Aula"
        subtitle="Envie um novo plano de aula"
      />

      <div className="planoContainer">

        <div className="planoOpcoes">
          <div
            className={`planoOpcaoCard ${modo === 'manual' ? 'ativo' : ''}`}
            onClick={() => setModo('manual')}
          >
            <div className="planoOpcaoIcone">
              <ClipboardList size={24} />
            </div>
            <div className="planoOpcaoTexto">
              <span className="planoOpcaoTitulo">Escreva manualmente</span>
              <span className="planoOpcaoDesc">Crie o plano com título, descrição e data</span>
            </div>
            {modo === 'manual' && <div className="planoOpcaoDot" />}
          </div>

          <div
            className={`planoOpcaoCard ${modo === 'anexo' ? 'ativo' : ''}`}
            onClick={() => setModo('anexo')}
          >
            <div className="planoOpcaoIcone">
              <Upload size={24} />
            </div>
            <div className="planoOpcaoTexto">
              <span className="planoOpcaoTitulo">Anexe o arquivo</span>
              <span className="planoOpcaoDesc">Faça um upload de um arquivo já pronto</span>
            </div>
            {modo === 'anexo' && <div className="planoOpcaoDot" />}
          </div>
        </div>

        {modo === 'manual' && (
          <div className="planoFormCard">
            <div className="planoFormRow">
              <div className="planoFormGroup">
                <label className="planoFormLabel">Data da aula</label>
                <div className="planoInputWrapper">
                  <input
                    className="planoFormInput"
                    type="text"
                    placeholder="Ex: 00/00/0000"
                    value={dataAula}
                    onChange={(e) => setDataAula(e.target.value)}
                  />
                  <Calendar size={18} className="planoInputIcon" />
                </div>
              </div>

              <div className="planoFormGroup">
                <label className="planoFormLabel">Conteúdo Programático(Título)</label>
                <div className="planoInputWrapper">
                  <input
                    className="planoFormInput"
                    type="text"
                    placeholder="Título do conteúdo"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                  />
                  <PenLine size={18} className="planoInputIcon" />
                </div>
              </div>
            </div>

            <div className="planoFormGroup full">
              <label className="planoFormLabel">Conteúdo Programático(Detalhamento)</label>
              <div className="planoTextareaWrapper">
                <textarea
                  className="planoFormTextarea"
                  placeholder="Detalhamento do conteúdo"
                  value={detalhamento}
                  onChange={(e) => setDetalhamento(e.target.value)}
                />
                <PenLine size={18} className="planoTextareaIcon" />
              </div>
            </div>
          </div>
        )}

        {modo === 'anexo' && (
          <div className="planoFormCard">
            <div
              className="planoUploadArea"
              onClick={() => inputArquivoRef.current?.click()}
            >
              <input
                ref={inputArquivoRef}
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const arquivo = e.target.files?.[0];
                  if (arquivo) setArquivoSelecionado(arquivo);
                }}
              />
              <Upload size={36} className="planoUploadIcone" />
              <p className="planoUploadTexto">
                {arquivoSelecionado
                  ? arquivoSelecionado.name
                  : <>Arraste e solte seu arquivo aqui ou <span>clique para selecionar</span></>
                }
              </p>
            </div>
          </div>
        )}

        {/* mensagem de erro */}
        {erro && (
          <p style={{ color: 'red', fontFamily: 'Inter', fontSize: 14 }}>{erro}</p>
        )}

        <div className="planoFooter">
          <button className="planoBtnCancelar" onClick={() => window.history.back()}>
            <div className="iconCancel">
              <X size={18}/>
            </div>
            Cancelar
          </button>
          <button
            className="planoBtnEnviar"
            onClick={handleEnviar}
            disabled={carregando}
          >
            <Send size={18} />
            {carregando ? 'Enviando...' : 'Enviar atividade'}
          </button>
        </div>

      </div>
    </LayoutBaseProf>
  );
}