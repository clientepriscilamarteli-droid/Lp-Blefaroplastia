import { type FormEvent } from 'react'
import { clinic } from '../clinic'

export const appointment = clinic.whatsapp + '?text=' + encodeURIComponent('Olá! Gostaria de agendar uma avaliação de toxina botulínica e preenchimentos com a Dra. Priscilla Martelli.')

export function Arrow() {
  return <span aria-hidden="true">↗</span>
}

export function Appointment({ children = 'Agendar minha avaliação', href = appointment, variant = '' }: {
  children?: string
  href?: string
  variant?: string
}) {
  return <a className={`appointment ${variant}`} href={href} target="_blank" rel="noreferrer">{children}<Arrow /></a>
}

export function Brand() {
  return <a className="brand" href="#inicio" aria-label="Martelli Care Clinic, início">
    <img src="/martelli-monograma.png" width="52" height="39" alt="" />
    <span>Martelli<small>Care Clinic</small></span>
  </a>
}

export function Booking() {
  function startConversation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const field = form.elements.namedItem('nome') as HTMLInputElement
    const name = field.value.trim()
    if (!name) {
      field.setCustomValidity('Digite seu nome.')
      field.reportValidity()
      return
    }
    const text = `Olá! Meu nome é ${name}. Gostaria de consultar os horários para uma avaliação com a Dra. Priscilla Martelli. Autorizo o uso do meu nome e número do WhatsApp para responder a este pedido.`
    window.location.assign(clinic.whatsapp + '?text=' + encodeURIComponent(text))
  }

  return (
    <section className="final-cta" id="agendar" aria-labelledby="contact-title">
      <img className="final-backdrop" src="/retratos/consultorio-martelli.jpg" alt="" loading="lazy" />
      <div className="wrap final-grid">
        <div>
          <h2 id="contact-title">Vamos cuidar<br /><em>da sua expressão?</em></h2>
          <p>Agende uma avaliação com a Dra. Priscilla Martelli e conheça as possibilidades para o seu rosto.</p>
          <a className="text-link" href={clinic.maps} target="_blank" rel="noreferrer">Rua Bento de Andrade, 319 · São Paulo <Arrow /></a>
        </div>
        <form className="booking-form" onSubmit={startConversation}>
          <label htmlFor="nome">Como podemos chamar você?</label>
          <input id="nome" name="nome" type="text" placeholder="Seu nome" autoComplete="given-name" maxLength={80}
            required onInput={event => event.currentTarget.setCustomValidity('')} />
          <label className="consent">
            <input name="privacidade" type="checkbox" required />
            <span>Autorizo a Martelli Care Clinic a usar meu nome e número do WhatsApp para responder ao pedido de agendamento.</span>
          </label>
          <details className="booking-privacy">
            <summary>Aviso de privacidade</summary>
            <p>Seu nome prepara uma mensagem no WhatsApp. Ao enviar, a clínica recebe o nome e o número para responder ao pedido. Você pode solicitar acesso, correção, exclusão ou revogar o consentimento pelo <a href={clinic.whatsapp} target="_blank" rel="noreferrer">WhatsApp da clínica</a>.</p>
          </details>
          <button className="appointment light" type="submit">Continuar no WhatsApp <Arrow /></button>
        </form>
      </div>
    </section>
  )
}
