import { useEffect, useState, type FormEvent } from 'react'
import { createRoot } from 'react-dom/client'
import { clinic, appointmentHref } from '../clinic'
import { Brand, Arrow } from '../harmonizacao/landing-sections'
import { MartelliMediaAccordion } from '../components/ui/martelli-media-accordion'
import { MartelliShimmerLink } from '../components/ui/martelli-shimmer-link'
import MoltenMetal from '../components/ui/MoltenMetal'
import '../harmonizacao/page.css'
import './page.css'

const appointment = appointmentHref('blefaroplastia na Martelli Care Clinic')
const blephVideo = 'https://www.instagram.com/drapriscillamartelli/reel/Ddtu6daBEVm/'
function CTA({ children = 'Agendar a minha avaliação' }: { children?: string }) {
  return <MartelliShimmerLink href={appointment}>{children}</MartelliShimmerLink>
}
function Actions() {
  return <div className="bleph-actions"><CTA/><MartelliShimmerLink href="#procedimento" secondary>Conhecer o tratamento</MartelliShimmerLink></div>
}

const faqs = [
  ['Para quem a blefaroplastia pode ser indicada?', 'Para pessoas com excesso de pele nas pálpebras e, conforme o caso, bolsas de gordura. A indicação depende do exame da região, da saúde dos olhos, do histórico de saúde e das expectativas.'],
  ['Blefaroplastia trata olheiras e pés de galinha?', 'Essas queixas têm causas diferentes. A cirurgia trata principalmente excesso de pele e bolsas nas pálpebras; pigmentação e linhas de expressão exigem uma avaliação específica.'],
  ['Como fica a cicatriz?', 'A localização das incisões depende da técnica. Na pálpebra superior, costuma acompanhar a dobra natural. Toda cirurgia pode deixar cicatrizes, e sua evolução varia de pessoa para pessoa.'],
  ['Como é a recuperação?', 'Inchaço, manchas roxas e desconforto podem ocorrer no início. O retorno ao trabalho, ao exercício e à maquiagem depende da evolução e da liberação do profissional responsável. O resultado se define progressivamente.'],
  ['Existem riscos e contraindicações?', 'Sim. Entre os riscos estão sangramento, infecção, olho seco, assimetrias, alterações na posição das pálpebras e, raramente, alterações visuais. Condições oculares, doenças, tabagismo e medicamentos precisam ser discutidos antes da indicação.'],
  ['Qual é o investimento?', 'O valor depende da avaliação e do plano proposto. Converse com a equipe para entender a consulta, o que está incluído no atendimento e as condições de pagamento.'],
]

function TreatmentSection() {
  return <section className="bleph-study" id="procedimento" aria-labelledby="study-title"><div className="wrap bleph-treatment-grid">
    <div><h2 id="study-title">Entenda a<br/><em>blefaroplastia.</em></h2><p>A cirurgia trata excesso de pele e, conforme a indicação, bolsas nas pálpebras.</p><dl className="bleph-treatment-list"><div><dt>Pálpebras superiores</dt><dd>Avaliação do excesso de pele sobre a dobra dos olhos.</dd></div><div><dt>Pálpebras inferiores</dt><dd>Avaliação das bolsas e da pele abaixo dos olhos.</dd></div></dl><p className="bleph-treatment-note">A consulta define se a cirurgia é indicada e qual abordagem faz sentido para você.</p><CTA/></div>
    <figure className="bleph-treatment-photo"><img src="/blefaroplastia/avaliacao-palpebras.webp" alt="Medição e planejamento das pálpebras antes da blefaroplastia" width="1440" height="1920" loading="lazy"/></figure>
  </div></section>
}

function Booking() {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const name = (event.currentTarget.elements.namedItem('nome') as HTMLInputElement).value.trim()
    if (!name) return
    window.location.assign(clinic.whatsapp + '?text=' + encodeURIComponent(`Olá! Meu nome é ${name}. Gostaria de agendar uma avaliação de blefaroplastia na Martelli Care Clinic.`))
  }
  return <section className="final-cta" id="agendar"><div className="wrap final-grid"><div><h2>Um novo olhar<br /><em>começa na conversa.</em></h2><p>Converse com a equipe e agende sua avaliação de blefaroplastia.</p><a className="text-link" href={clinic.maps} target="_blank" rel="noreferrer">Rua Bento de Andrade, 319 · São Paulo <Arrow /></a></div><form className="booking-form" onSubmit={submit}><label htmlFor="nome">Como podemos chamar você?</label><input id="nome" name="nome" placeholder="Seu nome" autoComplete="given-name" required maxLength={80} pattern=".*\S.*"/><label className="consent"><input type="checkbox" required/><span>Autorizo o uso do meu nome e número do WhatsApp para responder ao pedido de agendamento.</span></label><details className="booking-privacy"><summary>Aviso de privacidade</summary><p>Seu nome prepara uma mensagem no WhatsApp. Ao enviá-la, a clínica recebe seu nome e número para responder ao pedido. Você pode solicitar correção, exclusão ou revogar o consentimento pelo WhatsApp da clínica.</p></details><button className="appointment light" type="submit">Continuar no WhatsApp <Arrow /></button></form></div></section>
}

function App() {
  const [showFixed, setShowFixed] = useState(false)
  useEffect(() => {
    const hero = document.querySelector('.bleph-hero')!
    const observer = new IntersectionObserver(([entry]) => setShowFixed(!entry.isIntersecting && entry.boundingClientRect.bottom < 0))
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])
  return <div className="bleph-page"><a className="skip-link" href="#tratamentos">Pular para o conteúdo</a><main>
    <div className="bleph-opening-stack" id="inicio">
      <section className="bleph-hero" aria-labelledby="hero-title">
        <header className="bleph-site-header"><a className="bleph-site-brand" href="#inicio" aria-label="Martelli Care Clinic, início"><img src="/martelli-monograma.png" alt="" width="52" height="39"/><span><strong>MARTELLI CARE CLINIC</strong><small>Dra. Priscilla Martelli</small></span></a><nav aria-label="Menu principal"><a href="#procedimento">O tratamento</a><a href="#agendar">Agendar</a></nav></header>
        <div className="hero-media"><img className="hero-photo bleph-static-photo" src="/retratos/blefaroplastia-instagram.jpg" alt="Dra. Priscilla Martelli de máscara e touca durante um procedimento" fetchPriority="high"/></div>
        <div className="hero-shade" aria-hidden="true"/>
        <div className="bleph-static-copy"><h1 id="hero-title">Blefaroplastia</h1><p>Um olhar mais leve.<br/><em>A sua essência permanece.</em></p><Actions/></div>
      </section>
      <section className="bleph-manifesto" aria-labelledby="manifesto-title">
        <div className="bleph-manifesto-metal" aria-hidden="true"><MoltenMetal colors={['#000000','#d9d5d3']} coreColor="#ffffff" backgroundColor="#080808" speed={0.17} scale={4} detail={3} glow={1.6} thickness={1} haze={0.75} brightness={1.12} mouseInteraction={false} flareOnClick={false} dpr={1.25}/></div>
        <div className="wrap bleph-manifesto-copy"><h2 id="manifesto-title"><span>Um olhar mais leve.</span><em>Sem deixar de ser você.</em></h2><p>Cuidado com as pálpebras, respeitando seus traços.</p><CTA/></div>
      </section>
    </div>
    <section className="concern wrap section-space" id="tratamentos"><figure className="concern-photo"><img src="/blefaroplastia/consulta-individual.webp" alt="Dra. Priscilla durante uma consulta individual" loading="lazy" width="1440" height="1920"/></figure><div className="concern-copy"><h2>Você se reconhece.<br/><em>Mas o olhar parece cansado?</em></h2><p>Excesso de pele e bolsas podem deixar o olhar com aparência cansada. A avaliação ajuda a entender o que pode ser tratado.</p><ul className="concern-list"><li>Excesso de pele sobre a dobra da pálpebra superior.</li><li>Bolsas na região abaixo dos olhos.</li><li>Incômodo com a aparência das pálpebras.</li></ul><Actions/></div></section>
    <TreatmentSection/>
    <section className="bleph-planning wrap section-space"><div className="bleph-planning-heading"><h2>O cuidado está<br/><em>na forma de olhar.</em></h2></div><MartelliMediaAccordion items={[
      {title:'Seu olhar como referência', content:'Sua anatomia e suas expectativas orientam a avaliação.', media:'/blefaroplastia/escuta-na-consulta.webp', alt:'Conversa entre a Dra. Priscilla e um paciente durante avaliação'},
      {title:'Uma decisão bem orientada', content:'Indicação, técnica, limites e riscos explicados antes de decidir.', media:'/blefaroplastia/planejamento-individual.webp', alt:'Dra. Priscilla acompanhando a avaliação facial de um paciente'},
      {title:'Tempo para se recuperar', content:'Orientações e retornos conforme a sua recuperação.', media:'/blefaroplastia/atendimento-profissional.webp', alt:'Registro de atendimento da Dra. Priscilla Martelli'},
    ]}/><Actions/></section>
    <section className="bleph-process-films section-space" aria-labelledby="films-title">
      <div className="wrap bleph-gentle-process">
        <figure><img src="/blefaroplastia/marcacao-suave.webp" alt="Marcação das pálpebras com caneta durante o planejamento" width="720" height="1280" loading="lazy"/></figure>
        <div><h2 id="films-title">Antes de tudo,<br/><em>planejamento.</em></h2><p>A marcação das pálpebras faz parte de um cuidado pensado para cada pessoa.</p><Actions/><a className="text-link bleph-gentle-link" href={blephVideo} target="_blank" rel="noreferrer">Tire suas dúvidas com a Dra. Priscilla <Arrow/></a></div>
      </div>
    </section>
    <section className="doctor wrap section-space" id="especialista"><figure className="doctor-portrait"><img src="/retratos/dra-priscilla.jpg" alt="Dra. Priscilla Martelli" loading="lazy"/><figcaption>Cirurgiã-dentista · CRO 121952</figcaption></figure><div className="doctor-copy"><h2>Dra. Priscilla<br/><em>Martelli.</em></h2><p>Avaliação individual, planejamento e orientação em cada etapa do cuidado.</p><ul className="credentials"><li>Especialização em Harmonização Facial.</li><li>Pós-graduação em Cirurgias Estéticas da Face.</li><li>Atendimento no Jardim Paulista, em São Paulo.</li></ul><Actions/></div></section>
    <section className="timeline-section bleph-journey"><div className="wrap"><div className="section-heading"><h2>Presença em<br/><em>cada etapa.</em></h2></div><ol className="treatment-timeline">{[
      ['Avaliação','Suas queixas, o exame das pálpebras e seu histórico de saúde.'],
      ['Planejamento','Indicação, técnica, riscos e preparo, em uma conversa clara.'],
      ['Procedimento','Realização de acordo com o plano definido para o seu caso.'],
      ['Recuperação','Orientações, retornos e acompanhamento da cicatrização.'],
    ].map(([title,text],i)=><li key={title}><span className="step-number">0{i+1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol><Actions/></div></section>
    <section className="faq wrap section-space" id="duvidas"><div><h2>Clareza para<br/><em>o próximo passo.</em></h2><a className="text-link" href={appointment} target="_blank" rel="noreferrer">Tire suas dúvidas com a equipe <Arrow/></a></div><div className="faq-list">{faqs.map(([q,a])=><details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}<p className="clinical-sources">Informações gerais sobre a cirurgia. A avaliação individual define a indicação. Saiba mais na <a href="https://www.cirurgiaplastica.org.br/cirurgias-e-procedimentos/cirurgia-de-palpebra/" target="_blank" rel="noreferrer">Sociedade Brasileira de Cirurgia Plástica</a> e consulte os <a href="https://www.plasticsurgery.org/cosmetic-procedures/eyelid-surgery/safety" target="_blank" rel="noreferrer">riscos do procedimento</a>.</p></div></section>
    <Booking/>
  </main><footer className="footer wrap"><Brand/><p>Dra. Priscilla Martelli · Cirurgiã-dentista · CRO 121952<br/>Martelli Care Clinic · Jardim Paulista, São Paulo</p><div><a href="https://site-institucional-blush-six.vercel.app/">Site institucional <Arrow/></a><a href={clinic.instagram} target="_blank" rel="noreferrer">Instagram da clínica <Arrow/></a></div></footer>{showFixed && <div className="sticky-cta"><CTA/></div>}</div>
}
createRoot(document.getElementById('root')!).render(<App/> )
