import { useNavigate } from 'react-router-dom';
import { useIssue } from '../hooks/useIssue';
import { IssueForm } from '../components/issues/IssueForm';
import { Button } from '../components/ui/Button';
import { ArrowLeft, PlusCircle } from 'lucide-react';
import type { IssueFormData } from '../types';

export default function CreateIssuePage() {
  const navigate = useNavigate();
  const { createIssue, submitting } = useIssue();

  const handleSubmit = async (data: IssueFormData) => {
    try {
      const created = await createIssue(data);
      if (created && created._id) {
        navigate(`/issues/${created._id}`);
      }
    } catch (err) {
      console.error('Failed to create issue', err);
    }
  };

  return (
    <div className="page-container narrow-page">
      <header className="page-header">
        <div className="header-title">
          <PlusCircle className="header-icon" />
          <div>
            <h1>New Issue</h1>
            <p>Report a new bug or request a feature</p>
          </div>
        </div>
        <Button variant="ghost" onClick={() => navigate(-1)} icon={<ArrowLeft size={18} />}>
          Cancel
        </Button>
      </header>

      <div className="page-card">
        <IssueForm 
          onSubmit={handleSubmit} 
          onCancel={() => navigate(-1)} 
          loading={submitting} 
        />
      </div>
    </div>
  );
}
