import React, { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        company: '',
        name: '',
        email: '',
        phone: '',
        content: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // メール本文の作成
        const subject = `[HPお問い合わせ] ${formData.company} ${formData.name}様より`;
        const body = `
お問い合わせ内容：

会社名: ${formData.company}
お名前: ${formData.name}
メールアドレス: ${formData.email}
電話番号: ${formData.phone}

お問い合わせ内容:
${formData.content}
    `;

        // mailtoリンクの作成と実行
        window.location.href = `mailto:info@switch-media-jp.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
                <button type="submit" className="w-full bg-[#10b981] text-white font-bold py-4 rounded-md hover:bg-[#059669] transition-colors shadow-lg shadow-emerald-100">
                    確認する
                </button>
            </div>

        </form>
    );
};

export default ContactForm;
