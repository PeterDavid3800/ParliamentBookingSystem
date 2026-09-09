import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { visitTermsSections } from '@/Data/visitTerms';

export default function Terms() {
    return (
        <PublicLayout>
            <Head title="Terms & Conditions — Parliament of Kenya" />
            <section className="bg-gradient-to-r from-parliament-800 to-parliament-900 text-white py-14">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold">Important Rules</h1>
                    <p className="text-parliament-200 mt-3 text-lg">School visits to the National Assembly</p>
                </div>
            </section>

            <div className="max-w-3xl mx-auto px-4 py-12">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-8">
                    {visitTermsSections.map((section) => (
                        <section key={section.title}>
                            <h2 className="text-lg font-bold text-gray-900 mb-3">{section.title}</h2>
                            <ol className="list-decimal pl-5 space-y-3 text-sm text-gray-600 leading-relaxed">
                                {section.items.map((item) => <li key={item}>{item}</li>)}
                            </ol>
                        </section>
                    ))}
                </div>
            </div>
        </PublicLayout>
    );
}
