import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

export default function CustomFilterModal({ show, onClose, types, statuses, listingTypes, users, availableColumns, editingFilter = null }) {
    const [filterName, setFilterName] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [conditions, setConditions] = useState([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (editingFilter) {
            setFilterName(editingFilter.name);
            setIsPublic(editingFilter.is_public);
            setSelectedColumns(editingFilter.columns || []);
            setConditions(editingFilter.conditions || []);
        } else {
            resetForm();
        }
    }, [editingFilter, show]);

    const resetForm = () => {
        setFilterName('');
        setIsPublic(false);
        setSelectedColumns([]);
        setConditions([]);
    };

    const toggleColumn = (columnValue) => {
        setSelectedColumns(prev => 
            prev.includes(columnValue) 
                ? prev.filter(c => c !== columnValue)
                : [...prev, columnValue]
        );
    };

    const addCondition = () => {
        setConditions([...conditions, { field: '', operator: '=', value: '' }]);
    };

    const removeCondition = (index) => {
        setConditions(conditions.filter((_, i) => i !== index));
    };

    const updateCondition = (index, key, value) => {
        const newConditions = [...conditions];
        newConditions[index][key] = value;
        setConditions(newConditions);
    };

    const getOperatorsForField = (field) => {
        const numericFields = ['price', 'area', 'bedrooms', 'bathrooms'];
        if (numericFields.includes(field)) {
            return [
                { value: '=', label: 'Equals' },
                { value: '!=', label: 'Not Equals' },
                { value: '>', label: 'Greater Than' },
                { value: '<', label: 'Less Than' },
                { value: '>=', label: 'Greater or Equal' },
                { value: '<=', label: 'Less or Equal' },
            ];
        }
        return [
            { value: '=', label: 'Equals' },
            { value: '!=', label: 'Not Equals' },
            { value: 'like', label: 'Contains' },
        ];
    };

    const getOptionsForField = (field) => {
        switch(field) {
            case 'type':
                return types;
            case 'status':
                return statuses;
            case 'listing_type':
                return listingTypes;
            case 'assigned_to':
                return users.map(u => ({ value: u.id, label: u.name }));
            default:
                return null;
        }
    };

    const handleSave = async () => {
        if (!filterName.trim()) {
            alert('Please enter a filter name');
            return;
        }

        setSaving(true);

        const data = {
            name: filterName,
            is_public: isPublic,
            module: 'properties',
            columns: selectedColumns,
            conditions: conditions.filter(c => c.field && c.value),
        };

        try {
            if (editingFilter) {
                await axios.put(route('saved-filters.update', editingFilter.id), data);
            } else {
                await axios.post(route('saved-filters.store'), data);
            }
            
            resetForm();
            onClose();
            // Reload the page to refresh the filters list
            router.reload();
        } catch (error) {
            console.error('Error saving filter:', error);
            alert('Error saving filter. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center px-4">
                <div 
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
                    onClick={onClose}
                />
                
                <div className="relative w-full max-w-4xl rounded-lg bg-white shadow-xl dark:bg-gray-800">
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            {editingFilter ? 'Edit Custom Filter' : 'Create Custom Filter'}
                        </h3>

                        {/* Filter Name */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Filter Name *
                            </label>
                            <input
                                type="text"
                                value={filterName}
                                onChange={(e) => setFilterName(e.target.value)}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                placeholder="e.g., Villas in Nasr City"
                            />
                        </div>

                        {/* Public/Private Toggle */}
                        <div className="mb-6">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={isPublic}
                                    onChange={(e) => setIsPublic(e.target.checked)}
                                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                                />
                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                    Make this filter public (visible to all users)
                                </span>
                            </label>
                        </div>

                        {/* Column Selection */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Select Columns to Display
                            </label>
                            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto rounded border border-gray-300 p-3 dark:border-gray-600">
                                {availableColumns.map((column) => (
                                    <label key={column.value} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedColumns.includes(column.value)}
                                            onChange={() => toggleColumn(column.value)}
                                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                                        />
                                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                            {column.label}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Filter Conditions */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Filter Conditions
                                </label>
                                <button
                                    type="button"
                                    onClick={addCondition}
                                    className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                                >
                                    + Add Condition
                                </button>
                            </div>
                            
                            <div className="space-y-3">
                                {conditions.map((condition, index) => (
                                    <div key={index} className="flex gap-2 items-start">
                                        {/* Field */}
                                        <select
                                            value={condition.field}
                                            onChange={(e) => updateCondition(index, 'field', e.target.value)}
                                            className="flex-1 rounded-lg border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="">Select Field</option>
                                            {availableColumns.map(col => (
                                                <option key={col.value} value={col.value}>{col.label}</option>
                                            ))}
                                        </select>

                                        {/* Operator */}
                                        <select
                                            value={condition.operator}
                                            onChange={(e) => updateCondition(index, 'operator', e.target.value)}
                                            className="w-32 rounded-lg border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        >
                                            {getOperatorsForField(condition.field).map(op => (
                                                <option key={op.value} value={op.value}>{op.label}</option>
                                            ))}
                                        </select>

                                        {/* Value */}
                                        {getOptionsForField(condition.field) ? (
                                            <select
                                                value={condition.value}
                                                onChange={(e) => updateCondition(index, 'value', e.target.value)}
                                                className="flex-1 rounded-lg border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            >
                                                <option value="">Select Value</option>
                                                {getOptionsForField(condition.field).map(opt => (
                                                    <option key={opt.value || opt} value={opt.value || opt}>
                                                        {opt.label || opt}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                type="text"
                                                value={condition.value}
                                                onChange={(e) => updateCondition(index, 'value', e.target.value)}
                                                className="flex-1 rounded-lg border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                placeholder="Enter value"
                                            />
                                        )}

                                        {/* Remove Button */}
                                        <button
                                            type="button"
                                            onClick={() => removeCondition(index)}
                                            className="text-red-600 hover:text-red-700 dark:text-red-400"
                                        >
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                                
                                {conditions.length === 0 && (
                                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                                        No conditions added. Click "Add Condition" to add filter rules.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={saving}
                                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={saving}
                                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
                            >
                                {saving ? 'Saving...' : (editingFilter ? 'Update Filter' : 'Save Filter')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
