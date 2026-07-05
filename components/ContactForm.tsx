"use client";

import { CheckCircle2, Send } from "lucide-react";
import { FormEvent, useState } from "react";

type ContactFormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const emptyForm: ContactFormState = {
  name: "",
  email: "",
  subject: "",
  message: ""
};

export function ContactForm() {
  const [form, setForm] = useState<ContactFormState>(emptyForm);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: keyof ContactFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (error) {
      setError("");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim()) {
      setError("Enter your name.");
      return;
    }

    if (!form.email.trim() || !form.email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }

    if (!form.subject.trim()) {
      setError("Enter a subject.");
      return;
    }

    if (!form.message.trim()) {
      setError("Enter your message.");
      return;
    }

    setSubmitted(true);
    setForm(emptyForm);
    setError("");
  };

  if (submitted) {
    return (
      <div className="contact-form-success" role="status">
        <CheckCircle2 size={32} />
        <h2>Message sent</h2>
        <p>Thanks for reaching out. Our support team will respond within 1–2 business days.</p>
        <button className="text-link" onClick={() => setSubmitted(false)} type="button">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="track-form contact-form" onSubmit={handleSubmit}>
      <h2>Send us a message</h2>
      <p className="contact-form-lead">We typically reply within 1–2 business days.</p>
      <label>
        Full name
        <input
          name="name"
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
          autoComplete="name"
          placeholder="Your name"
        />
      </label>
      <label>
        Email
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          autoComplete="email"
          placeholder="you@example.com"
        />
      </label>
      <label>
        Subject
        <input
          name="subject"
          value={form.subject}
          onChange={(event) => updateField("subject", event.target.value)}
          placeholder="Order help, product question, etc."
        />
      </label>
      <label>
        Message
        <textarea
          name="message"
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="How can we help?"
          rows={5}
        />
      </label>
      {error && (
        <p className="checkout-error" role="alert">
          {error}
        </p>
      )}
      <button className="primary-link" type="submit">
        <Send size={18} />
        Send message
      </button>
    </form>
  );
}
