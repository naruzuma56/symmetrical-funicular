import * as React from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MessageSquareHeart, CircleDollarSign } from 'lucide-react';
import { profile, socials } from '../../data/profile';
import { SectionHeading } from '../common/SectionHeading';
import { MangaPanel } from '../common/MangaPanel';
import { MangaButton } from '../common/MangaButton';
import { useAudio } from '../../hooks/useAudio';

const inputClasses =
  'w-full border-4 border-ink bg-bone px-3 py-2 font-body text-base font-semibold text-ink placeholder:text-ink/35 focus:border-blood focus:shadow-manga-xs focus:outline-none transition-shadow';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-pop text-xs tracking-[0.25em] text-ink/70">{label}</span>
      {children}
    </label>
  );
}

export function Contact() {
  const { play } = useAudio();
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    play('stamp');
    setSubmitted(true);
    event.currentTarget.reset();
    window.setTimeout(() => setSubmitted(false), 6500);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-bone py-20 lg:py-28">
      <div className="speed-lines-bg pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          chapter="第7話"
          title="TRANSMISSION"
          katakana="連絡"
          subtitle="Fan mail is read every morning over green tea. Manuscript submissions take a little longer."
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
          {/* Info column */}
          <div className="space-y-5">
            <MangaPanel accent="crimson" className="p-6">
              <div className="flex items-center gap-2 text-blood">
                <span className="inline-block h-3 w-3 animate-blink rounded-full bg-blood" />
                <span className="font-comic tracking-[0.2em]">{profile.availability}</span>
              </div>
              <p className="mt-3 font-body text-base font-semibold leading-relaxed text-ink/90">
                Currently accepting web-app development, team-side panel work, and well-seasoned ramen recommendations.
              </p>
            </MangaPanel>

            <MangaPanel accent="yellow" halftone className="p-6">
              <a
                href={`mailto:${profile.email}`}
                onClick={() => play('click')}
                data-ink-hover
                className="flex items-center gap-3"
              >
                <Mail className="h-8 w-8 shrink-0 text-blood" />
                <div>
                  <p className="font-pop text-[10px] tracking-[0.25em] text-ink/60">DIRECT WIRE</p>
                  <p className="break-all font-body text-lg font-extrabold text-ink underline decoration-blood decoration-2 underline-offset-2">
                    {profile.email}
                  </p>
                </div>
              </a>
            </MangaPanel>

            <div className="grid grid-cols-2 gap-4">
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => play('click')}
                  data-ink-hover
                  className="pressable group border-4 border-ink bg-paper p-3 shadow-manga-xs"
                >
                  <p className="font-comic text-lg leading-none tracking-wide text-ink">
                    {social.label.toUpperCase()}
                  </p>
                  <p className="mt-1 truncate font-pop text-[11px] text-ink/60">{social.handle}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Form column */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <MangaPanel accent="black" className="overflow-visible p-6 sm:p-8" shadow>
              <div className="mb-6 flex items-center gap-2">
                <MessageSquareHeart className="h-6 w-6 text-blood" />
                <h3 className="font-comic text-2xl tracking-wide text-ink">LETTER TO THE EDITOR</h3>
              </div>

              {submitted ? (
                <div className="animate-pop border-4 border-ink bg-sunny p-6 text-center" role="status">
                  <p className="font-comic text-3xl tracking-wide text-ink">SUBMISSION RECEIVED!</p>
                  <p className="mt-2 font-body text-sm font-semibold text-ink/80">
                    Your scroll has been stamped and filed. Expect a reply within one… two… OK, two business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="CODE NAME"> <input required name="name" type="text" placeholder="Goku Darkmode" className={inputClasses} /> </Field>
                    <Field label="RETURN ADDRESS"> <input required name="email" type="email" placeholder="hero@example.jp" className={inputClasses} /> </Field>
                  </div>
                  <Field label="SUBJECT">
                    <select name="subject" aria-label="Subject" className={inputClasses} defaultValue="collab">
                      <option value="collab">COLLABORATION INVITATION</option>
                      <option value="role">JOB / CONTRACT</option>
                      <option value="fanmail">FAN MAIL</option>
                      <option value="ramen">RAMEN ARGUMENT</option>
                    </select>
                  </Field>
                  <Field label="THE LETTER">
                    <textarea
                      required
                      name="message"
                      rows={6}
                      placeholder="Dear editor — your commits gave me hope..."
                      className={`${inputClasses} resize-none`}
                    />
                  </Field>
                  <div className="flex flex-wrap items-center gap-4 pt-1">
                    <MangaButton type="submit" variant="blood" size="lg" sound="stamp">
                      <Send className="h-5 w-5" /> SEND VIA MOCHI-PIGEON
                    </MangaButton>
                    <span className="inline-flex items-center gap-1.5 font-pop text-xs text-ink/50">
                      <CircleDollarSign className="h-4 w-4" /> NO PIGEON FEES · ENCRYPTED IN TRANSPORT
                    </span>
                  </div>
                </form>
              )}
            </MangaPanel>
          </motion.div>
        </div>
      </div>
    </section>
  );
}