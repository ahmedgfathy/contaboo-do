import { useState, useEffect } from 'react';
import axios from 'axios';

export default function OwnerSelector({ value, onChange, error }) {
    const [phone, setPhone] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedOwner, setSelectedOwner] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [formData, setFormData] = useState({
        company_name: '',
        contact_person: '',
        phone: '',
        mobile: '',
        type: 'owner',
    });

    useEffect(() => {
        if (phone.length >= 3) {
            const delayDebounceFn = setTimeout(() => {
                searchOwners();
            }, 300);

            return () => clearTimeout(delayDebounceFn);
        } else {
            setSearchResults([]);
            setShowResults(false);
        }
    }, [phone]);

    const searchOwners = async () => {
        try {
            const response = await axios.get(route('contacts.searchByPhone'), {
                params: { phone }
            });
            setSearchResults(response.data);
            setShowResults(true);
        } catch (error) {
            console.error('Error searching owners:', error);
        }
    };

    const handleSelectOwner = (owner) => {
        setSelectedOwner(owner);
        setPhone(`${owner.company_name || owner.contact_person} - ${owner.phone}`);
        setShowResults(false);
        onChange(owner.id);
    };

    const handleCreateNew = () => {
        setFormData({
            ...formData,
            phone: phone
        });
        setShowModal(true);
        setShowResults(false);
    };

    const handleQuickCreate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(route('contacts.quickCreate'), formData);
            setSelectedOwner(response.data);
            setPhone(`${response.data.company_name} - ${response.data.phone}`);
            onChange(response.data.id);
            setShowModal(false);
            setFormData({
                company_name: '',
                contact_person: '',
                phone: '',
                mobile: '',
                type: 'owner',
            });
        } catch (error) {
            console.error('Error creating owner:', error);
            alert('Error creating owner. Please check the form.');
        }
    };

    return (
        <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Property Owner (Search by Phone)
            </label>
            <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number (3-5 digits)"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
                <div className="absolute z-10 mt-1 w-full rounded-lg bg-white shadow-lg dark:bg-gray-800 border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto">
                    {searchResults.map((owner) => (
                        <button
                            key={owner.id}
                            type="button"
                            onClick={() => handleSelectOwner(owner)}
                            className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700 last:border-0"
                        >
                            <div className="font-medium text-gray-900 dark:text-white">
                                {owner.company_name || owner.contact_person}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                {owner.phone} {owner.mobile && `/ ${owner.mobile}`} - <span className="capitalize">{owner.type}</span>
                            </div>
                        </button>
                    ))}
                    <button
                        type="button"
                        onClick={handleCreateNew}
                        className="w-full text-left px-4 py-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/50"
                    >
                        + Create New Owner
                    </button>
                </div>
            )}

            {showResults && searchResults.length === 0 && phone.length >= 3 && (
                <div className="absolute z-10 mt-1 w-full rounded-lg bg-white shadow-lg dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <div className="px-4 py-3 text-gray-500 dark:text-gray-400">
                        No owners found with this phone number
                    </div>
                    <button
                        type="button"
                        onClick={handleCreateNew}
                        className="w-full text-left px-4 py-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border-t border-gray-200 dark:border-gray-700"
                    >
                        + Create New Owner
                    </button>
                </div>
            )}

            {/* Quick Create Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Create New Owner
                        </h3>
                        <form onSubmit={handleQuickCreate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Company/Person Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.company_name}
                                    onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Contact Person <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.contact_person}
                                    onChange={(e) => setFormData({...formData, contact_person: e.target.value})}
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Phone <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Mobile
                                </label>
                                <input
                                    type="tel"
                                    value={formData.mobile}
                                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    required
                                    value={formData.type}
                                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="owner">Property Owner</option>
                                    <option value="agent">Real Estate Agent</option>
                                    <option value="broker">Broker (Another Company)</option>
                                    <option value="other">Freelance Broker</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                                >
                                    Create Owner
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {selectedOwner && (
                <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm font-medium text-green-800 dark:text-green-400">
                                Selected: {selectedOwner.company_name || selectedOwner.contact_person}
                            </div>
                            <div className="text-xs text-green-600 dark:text-green-500">
                                {selectedOwner.phone} - <span className="capitalize">{selectedOwner.type}</span>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                setSelectedOwner(null);
                                setPhone('');
                                onChange(null);
                            }}
                            className="text-red-600 hover:text-red-700 dark:text-red-400"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
