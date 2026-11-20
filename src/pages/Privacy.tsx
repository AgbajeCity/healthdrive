import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { Card, CardContent } from "@/components/ui/card";

const EMAIL_DPO = "healthdrive.ltd@gmail.com";
const EMAIL_NCSA = "complaint@dpo.gov.rw";

const Privacy = () => (
  <div className="min-h-screen bg-gradient-hero">
    <Navigation />
    <Seo
      title="Privacy Notice"
      description="HealthDrive Technologies LTD privacy notice: what the planned USSD service collects, why, who sees it, how long it is kept and your rights under Law No. 058/2021."
      path="/privacy"
    />
    <a id="main" tabIndex={-1} className="sr-only">Main content</a>

    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex items-center gap-3 mb-3">
          <ShieldCheck className="w-10 h-10 text-primary" aria-hidden="true" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Privacy Notice</h1>

        <Card className="bg-card/90 backdrop-blur-sm border-border/50">
          <CardContent className="p-6 md:p-8 space-y-8">
            <p className="text-foreground">
              HealthDrive Technologies LTD, KN 78 Street, Indangamirwa, Kiyovu, Nyarugenge, Kigali,
              Rwanda. Company code 156795747.
            </p>

            <section aria-labelledby="dpo">
              <h2 id="dpo" className="text-xl font-bold text-foreground mb-2">Data Protection Officer</h2>
              <p className="text-foreground">
                Florence Kabeya. Email{" "}
                <a
                  href={`mailto:${EMAIL_DPO}`}
                  className="text-primary underline underline-offset-4 hover:no-underline"
                >
                  {EMAIL_DPO}
                </a>{" "}
                (subject: "Data Protection Officer"). Phone{" "}
                <a
                  href="tel:+250793245004"
                  className="text-primary underline underline-offset-4 hover:no-underline"
                >
                  +250 793 245 004
                </a>
                .
              </p>
            </section>

            <section aria-labelledby="collect">
              <h2 id="collect" className="text-xl font-bold text-foreground mb-2">What we collect</h2>
              <p className="text-foreground">
                When you use our USSD service: your mobile number, your district and sector, your age
                band and sex, the menu options you choose, whether a referral was completed, and the
                date, time and length of each session. We record when you gave consent and which
                consent screen you saw. We never ask for your name, national ID number or a diagnosis.
              </p>
            </section>

            <section aria-labelledby="why">
              <h2 id="why" className="text-xl font-bold text-foreground mb-2">Why we collect it</h2>
              <p className="text-foreground">
                To show you the nearest health facility, to let a community health worker call you
                back, and to remind you about referrals your health facility has made. Using the
                service is voluntary.
              </p>
            </section>

            <section aria-labelledby="grounds">
              <h2 id="grounds" className="text-xl font-bold text-foreground mb-2">Legal grounds</h2>
              <p className="text-foreground">
                Your consent, given on the first USSD screen. For health-related data, your consent
                and the purposes of preventive medicine and public health under Law No. 058/2021.
              </p>
            </section>

            <section aria-labelledby="children">
              <h2 id="children" className="text-xl font-bold text-foreground mb-2">Children</h2>
              <p className="text-foreground">
                If you choose the under-16 age band, you get facility information only and we keep
                nothing from your session.
              </p>
            </section>

            <section aria-labelledby="who">
              <h2 id="who" className="text-xl font-bold text-foreground mb-2">Who sees your data</h2>
              <p className="text-foreground">
                The health facility and community health worker linked to your referral, and the
                companies that run our service for us: Africa's Talking (USSD gateway) and our hosting
                provider. We never sell your data or use it for marketing. No decision about you is
                made by automated means.
              </p>
            </section>

            <section aria-labelledby="storage">
              <h2 id="storage" className="text-xl font-bold text-foreground mb-2">Storage outside Rwanda</h2>
              <p className="text-foreground">
                Our service providers may process data outside Rwanda (Kenya and the United States).
                We do this only with authorisation from the National Cyber Security Authority (NCSA)
                and under written contracts that follow NCSA's Standard Contractual Clauses.
              </p>
            </section>

            <section aria-labelledby="retention">
              <h2 id="retention" className="text-xl font-bold text-foreground mb-2">How long we keep it</h2>
              <p className="text-foreground">
                We delete or anonymise your data 12 months after your last session.
              </p>
            </section>

            <section aria-labelledby="rights">
              <h2 id="rights" className="text-xl font-bold text-foreground mb-2">Your rights</h2>
              <p className="text-foreground">
                You can ask to see, correct, delete or move your data, restrict or object to its use,
                or withdraw your consent at any time. Contact our Data Protection Officer. You can
                complain to NCSA at{" "}
                <a
                  href={`mailto:${EMAIL_NCSA}`}
                  className="text-primary underline underline-offset-4 hover:no-underline"
                >
                  {EMAIL_NCSA}
                </a>{" "}
                or on 9080.
              </p>
            </section>

            <section aria-labelledby="security">
              <h2 id="security" className="text-xl font-bold text-foreground mb-2">Security</h2>
              <p className="text-foreground">
                Your data is encrypted in transit and at rest. Only our founders can access the
                database, with two-factor sign-in. If a breach happens, we tell NCSA within 48 hours
                and tell affected users where the risk is high.
              </p>
            </section>

            <section aria-labelledby="emergencies">
              <h2 id="emergencies" className="text-xl font-bold text-foreground mb-2">Emergencies</h2>
              <p className="text-foreground">
                HealthDrive does not diagnose. In an emergency, call 912 or go to the nearest health
                facility.
              </p>
            </section>

            <section aria-labelledby="analytics">
              <h2 id="analytics" className="text-xl font-bold text-foreground mb-2">Website analytics</h2>
              <p className="text-foreground">
                Lovable, the platform that hosts this site, adds a small script to every page of the
                published site. It uses no cookies, stores nothing on your device, does not keep your
                IP address and cannot identify you. It records the pages visited, where visitors came
                from, their country, browser, operating system and device type, how long they stay,
                how fast pages load, errors, and which buttons and links are clicked. Detailed data is
                kept for 90 days and daily summaries for a year. This site has no cookie banner, so
                this is recorded for every visitor. Lovable collects this data for us.{" "}
                <a
                  href="https://lovable.dev/privacy"
                  className="text-primary underline underline-offset-4 hover:no-underline"
                >
                  Lovable's privacy policy
                </a>{" "}
                explains how it handles it.
              </p>
            </section>

            <p className="text-sm text-muted-foreground border-t border-border/50 pt-4">
              Last updated: 20 November 2026.
            </p>
          </CardContent>
        </Card>

        <div className="mt-6">
          <Link
            to="/"
            className="text-primary underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>

    <Footer />
  </div>
);

export default Privacy;
