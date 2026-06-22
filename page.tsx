'use client';

import Image from 'next/image';
import { BookOpen, CheckCircle2, GraduationCap, Mail, MapPin, Phone, School, UserRound, CreditCard } from 'lucide-react';
import { FormEvent, useMemo, useState } from 'react';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyIsue-gUZ-FpOhP_AOIgwDeWfn5l5dwPVWGQ94Uo8cYzMmvRw4HwNPlMpMZLIzhY6v2Q/exec';
const BKASH_NUMBER = '+8801619424854';
const WHATSAPP_NUMBER = '8801619424854';

const fees: Record<string, number> = {
  'Class 8': 500,
  'Class 9': 700,
  'Class 10': 800,
};

export default function Home() {
  const [selectedClass, setSelectedClass] = useState('Class 8');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const fee = fees[selectedClass];

  const whatsappText = useMemo(() => {
    return encodeURIComponent(`আসসালামু আলাইকুম, আমি Edustika ${selectedClass} ব্যাচে এনরোল করতে চাই। মাসিক ফি: ৳${fee}`);
  }, [selectedClass, fee]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      firstName: formData.get('firstName'),
      middleName: formData.get('middleName'),
      lastName: formData.get('lastName'),
      school: formData.get('school'),
      address: formData.get('address'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      studentClass: selectedClass,
      fee,
    };

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setStatus('✅ আপনার তথ্য সফলভাবে জমা হয়েছে। এখন WhatsApp-এ পেমেন্ট কনফার্ম করুন।');
      form.reset();
      setSelectedClass('Class 8');
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`, '_blank');
    } catch (error) {
      setStatus('❌ সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-wrap">
      <section className="enrollment-card">
        <aside className="left-panel">
          <div className="overlay" />
          <div className="left-content">
            <div className="logo-box">
              <Image src="/edustika-logo.png" alt="Edustika Logo" width={78} height={78} priority />
            </div>
            <h1>Edustika</h1>
            <h2>Batch Enrollment</h2>
            <p className="intro">আমরা শিক্ষার্থীদের জন্য সহজ, মানসম্মত ও গাইডলাইনভিত্তিক শিক্ষা নিশ্চিত করি।<br />ক্লাস ৮ থেকে ১০ পর্যন্ত নিয়মিত ব্যাচে এনরোল করুন।</p>

            <div className="features">
              <p><CheckCircle2 size={18} /> ইন্টারেক্টিভ লাইভ সেশন</p>
              <p><CheckCircle2 size={18} /> সাপ্তাহিক মূল্যায়ন পরীক্ষা</p>
              <p><CheckCircle2 size={18} /> ডেডিকেটেড গাইডলাইন সাপোর্ট</p>
            </div>

            <div className="payment-box">
              <span>নিরাপদ পেমেন্ট পার্টনার</span>
              <strong>💗 bKash</strong>
              <small>{BKASH_NUMBER} | Payment Only</small>
            </div>
          </div>
        </aside>

        <section className="form-panel">
          <form onSubmit={handleSubmit}>
            <div className="section-title"><CreditCard size={20} /> শিক্ষার্থীর বিবরণ</div>
            <div className="line" />

            <div className="grid three">
              <Field label="প্রথম নাম *" name="firstName" placeholder="প্রথম নাম" required icon={<UserRound />} />
              <Field label="মধ্যম নাম (ঐচ্ছিক)" name="middleName" placeholder="মধ্যম নাম" icon={<UserRound />} />
              <Field label="শেষ নাম *" name="lastName" placeholder="শেষ নাম" required icon={<UserRound />} />
            </div>

            <div className="grid two">
              <Field label="স্কুলের নাম *" name="school" placeholder="স্কুলের নাম" required icon={<School />} />
              <Field label="বর্তমান ঠিকানা *" name="address" placeholder="ঠিকানা" required icon={<MapPin />} />
              <Field label="অভিভাবকের ফোন নম্বর *" name="phone" placeholder="01__ ___ ____" required icon={<Phone />} />
              <Field label="ইমেইল ঠিকানা (ঐচ্ছিক)" name="email" type="email" placeholder="student@example.com" icon={<Mail />} />
            </div>

            <div className="section-title second"><BookOpen size={20} /> একাডেমিক বিবরণ</div>
            <div className="line" />
            <label className="label">শ্রেণী নির্বাচন করুন *</label>
            <div className="class-row">
              {Object.keys(fees).map((className) => (
                <button key={className} type="button" className={selectedClass === className ? 'class-btn active' : 'class-btn'} onClick={() => setSelectedClass(className)}>
                  {className}
                </button>
              ))}
            </div>

            <div className="price-card">
              <div>
                <span>মোট প্রদেয় টাকার পরিমাণ</span>
                <h3>৳ {fee} <small>/ মাস</small></h3>
              </div>
              <button className="submit-btn" disabled={loading} type="submit">
                {loading ? 'জমা হচ্ছে...' : 'পরবর্তী ধাপ (পেমেন্ট)'} <span>➜</span>
              </button>
            </div>

            {status && <p className="status">{status}</p>}
          </form>
        </section>
      </section>
    </main>
  );
}

function Field({ label, name, placeholder, type = 'text', required = false, icon }: { label: string; name: string; placeholder: string; type?: string; required?: boolean; icon: React.ReactNode }) {
  return (
    <label className="field">
      <span>{label}</span>
      <div className="input-wrap">
        <i>{icon}</i>
        <input name={name} type={type} placeholder={placeholder} required={required} />
      </div>
    </label>
  );
}
