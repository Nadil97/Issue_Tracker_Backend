import { useState, useEffect } from 'react';
import type { IssueFormData, Issue, User } from '../../types';
import { userService } from '../../services/userService';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from '../../utils/constants';
import { AlertCircle, Save, X } from 'lucide-react';

interface IssueFormProps {
  initialData?: Issue;
  onSubmit: (data: IssueFormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export function IssueForm({ initialData, onSubmit, onCancel, loading }: IssueFormProps) {
  const [formData, setFormData] = useState<IssueFormData>({
    title: '',
    description: '',
    status: 'Open',
    priority: 'Medium',
    assignees: [],
  });

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    userService.getUsers().then(setUsers).catch(console.error);
  }, []);

  const [errors, setErrors] = useState<Partial<Record<keyof IssueFormData, string>>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        status: initialData.status,
        priority: initialData.priority,
        assignees: initialData.assignees?.map(a => a._id) || [],
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: Partial<Record<keyof IssueFormData, string>> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (formData.title.length > 100) newErrors.title = 'Title must be under 100 characters';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.description.length > 500) newErrors.description = 'Description must be under 500 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      await onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="issue-form">
      <div className="form-sections">
        <div className="form-section">
          <Input
            id="title"
            label="Issue Title"
            placeholder="e.g., Fix login button overlap"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            error={errors.title}
            disabled={loading}
          />

          <div className="form-grid">
            <Select
              id="status"
              label="Status"
              options={STATUS_OPTIONS.map(s => ({ label: s, value: s }))}
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              disabled={loading}
            />
            <Select
              id="priority"
              label="Priority"
              options={PRIORITY_OPTIONS.map(p => ({ label: p, value: p }))}
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
              disabled={loading}
            />
            <Select
              id="assignees"
              label="Assign To (Multiple)"
              multiple
              className="h-auto py-2"
              options={users.map(u => ({ label: u.name, value: u._id }))}
              value={formData.assignees as any}
              onChange={(e) => {
                const values = Array.from(e.target.selectedOptions, option => option.value);
                setFormData({ ...formData, assignees: values });
              }}
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label className="form-label" htmlFor="description">Description</label>
            <textarea
              id="description"
              className={`form-textarea ${errors.description ? 'input-error' : ''}`}
              placeholder="Describe the issue in detail..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={6}
              disabled={loading}
            />
            {errors.description && <p className="form-error">{errors.description}</p>}
          </div>
        </div>
      </div>

      <div className="form-actions">
        <Button variant="ghost" type="button" onClick={onCancel} disabled={loading} icon={<X size={18} />}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" loading={loading} icon={<Save size={18} />}>
          {initialData ? 'Update Issue' : 'Create Issue'}
        </Button>
      </div>
    </form>
  );
}
