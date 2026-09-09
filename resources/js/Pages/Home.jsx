import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { CalendarDays, Clock3, GraduationCap, Landmark, MapPin, ShieldCheck } from 'lucide-react';

export default function Home() {
    return (
        <PublicLayout>
            <Head title="Visit Parliament of Kenya" />
            <section className="relative text-white overflow-hidden min-h-[560px] flex items-center" style={{
                backgroundImage: "linear-gradient(90deg, rgba(3,78,39,.96), rgba(10,102,55,.84), rgba(3,78,39,.55)), url('https://images.unsplash.com/photo-1590083948734-681d1f59c218?w=1800&q=85')",
                backgroundSize: 'cover', backgroundPosition: 'center'
            }}>
                <div className="max-w-6xl mx-auto px-4 py-24 w-full">
                    <div className="max-w-3xl">
                        <span className="inline-flex bg-white/15 border border-white/25 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">Official National Assembly Visits Portal</span>
                        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">Visit the Parliament of Kenya</h1>
                        <p className="mt-6 text-lg md:text-xl text-green-50 max-w-2xl leading-relaxed">Plan an educational visit to the National Assembly. Registration is available to primary schools, junior and senior secondary schools, colleges, TVETs, universities and other institutions.</p>
                        <div className="mt-9 flex flex-col sm:flex-row gap-4">
                            <Link href="/book" className="inline-flex justify-center items-center bg-white text-parliament-800 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 shadow-lg">Book a Visit</Link>
                            <Link href="/schedule" className="inline-flex justify-center items-center bg-parliament-950/30 border border-white/30 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10">View Visit Schedule</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white border-b border-green-100">
                <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <Stat icon={CalendarDays} title="Monday–Friday" text="Visit days" />
                    <Stat icon={Clock3} title="9:00 AM–5:00 PM" text="Visiting hours" />
                    <Stat icon={GraduationCap} title="7 Categories" text="Institutions welcome" />
                    <Stat icon={ShieldCheck} title="Consent First" text="Before registration" />
                </div>
            </section>

            <section className="py-16 bg-green-50/40">
                <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <p className="text-parliament-600 font-bold uppercase tracking-widest text-sm">Plan your visit</p>
                        <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-5">A simple booking process for institutions</h2>
                        <p className="text-gray-600 leading-relaxed">Choose a weekday, select an available time, provide your institution and group details, then submit your visit request. County selection automatically opens the relevant constituencies.</p>
                        <div className="grid sm:grid-cols-2 gap-4 mt-7">
                            <Info icon={Clock3} title="Sitting Days" text="Tuesday–Thursday: 20-minute slots" />
                            <Info icon={Clock3} title="Other Weekdays" text="Monday & Friday: 30-minute slots" />
                            <Info icon={MapPin} title="Location Details" text="County and constituency captured" />
                            <Info icon={Landmark} title="Group Details" text="Learners, accompanying persons & accessibility" />
                        </div>
                    </div>
                    <div className="bg-parliament-900 text-white rounded-2xl p-8 shadow-xl">
                        <h3 className="text-2xl font-bold mb-5">Registration Categories</h3>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            {['Primary','Junior Secondary','Senior Secondary','Colleges','TVETs','Universities','Others'].map((item) => <div key={item} className="bg-white/10 border border-white/10 rounded-lg p-3">{item}</div>)}
                        </div>
                        <Link href="/book" className="mt-7 inline-flex w-full justify-center bg-parliament-500 hover:bg-parliament-400 px-6 py-3 rounded-lg font-bold">Start Registration →</Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

function Stat({ icon: Icon, title, text }) {
    return <div className="text-center"><Icon className="w-8 h-8 mx-auto text-parliament-700 mb-2" /><div className="font-bold text-parliament-900">{title}</div><div className="text-sm text-gray-500">{text}</div></div>;
}
function Info({ icon: Icon, title, text }) {
    return <div className="bg-white border border-green-100 rounded-xl p-4"><Icon className="w-5 h-5 text-parliament-700 mb-2" /><div className="font-semibold text-gray-900">{title}</div><div className="text-sm text-gray-500 mt-1">{text}</div></div>;
}
