import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        company: '',
        name: '',
        email: '',
        phone: '',
        content: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await emailjs.send(
                'service_7gcmmio',
                'template_contact_form',
                {
                    company: formData.company,
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    content: formData.content,
                },
                'tuxKBzBYgZnkIZYu8'
            );

            alert('お問い合わせを受け付けました。担当者よりご連絡させていただきます。');
            setFormData({
                company: '',
                name: '',
                email: '',
                phone: '',
                content: ''
            });
        } catch (error) {
            console.error('EmailJS Error:', error);
            alert('送信に失敗しました。申し訳ありませんが、時間をおいて再度お試しいただくか、直接メールにてお問い合わせください。');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="space-y-8" onSubmit={handleSubmit}>

            {/* Company Name */}
            <div>
                <div className="flex items-center mb-2">
                    <label htmlFor="company" className="text-sm font-bold text-gray-700">会社名</label>
                    <span className="ml-3 text-xs text-red-500 font-bold">必須</span>
                </div>
                <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#10b981] transition-colors"
                />
            </div>

            {/* Name */}
            <div>
                <div className="flex items-center mb-2">
                    <label htmlFor="name" className="text-sm font-bold text-gray-700">お名前</label>
                    <span className="ml-3 text-xs text-red-500 font-bold">必須</span>
                </div>
                <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#10b981] transition-colors"
                />
            </div>

            {/* Email */}
            <div>
                <div className="flex items-center mb-2">
                    <label htmlFor="email" className="text-sm font-bold text-gray-700">メールアドレス</label>
                    <span className="ml-3 text-xs text-red-500 font-bold">必須</span>
                </div>
                <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#10b981] transition-colors"
                />
            </div>

            {/* Phone */}
            <div>
                <div className="flex items-center mb-2">
                    <label htmlFor="phone" className="text-sm font-bold text-gray-700">電話番号</label>
                    <span className="ml-3 text-xs text-red-500 font-bold">必須</span>
                </div>
                <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#10b981] transition-colors"
                />
            </div>

            {/* Content */}
            <div>
                <div className="flex items-center mb-2">
                    <label htmlFor="content" className="text-sm font-bold text-gray-700">お問い合わせ内容</label>
                    <span className="ml-3 text-xs text-red-500 font-bold">必須</span>
                </div>
                <textarea
                    id="content"
                    rows="6"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#10b981] transition-colors resize-none"
                ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#10b981] text-white font-bold py-4 rounded-md hover:bg-[#059669] transition-colors shadow-lg shadow-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? '送信中...' : '送信する'}
                </button>
            </div>

        </form>
    );
};

export default ContactForm;
