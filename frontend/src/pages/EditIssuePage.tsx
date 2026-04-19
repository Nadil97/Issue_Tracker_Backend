import { useParams, useNavigate } from 'react-router-dom';
import { useIssue } from '../hooks/useIssue';
import { IssueForm } from '../components/issues/IssueForm';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { ArrowLeft, Edit3, AlertTriangle } from 'lucide-react';
import type { IssueFormData } from '../types';

export default function EditIssuePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { issue, loading, submitting, error, updateIssue } = useIssue(id);

  const handleSubmit = async (data: IssueFormData) => {
    if (id) {
      try {
        await updateIssue(id, data);
        navigate(`/issues/${id}`);
      } catch (err) {
        console.error('Failed to update issue', err);
      }
    }
  };

  if (loading) return <div className="page-loading"><Spinner size="lg" text="Loading issue..." /></div>;
  if (error || !issue) return (
    <div className="page-error">
      <AlertTriangle size={48} />
      <h2>Error</h2>
      <p>{error || 'Issue not found'}</p>
      <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
    </div>
  );

  return (
    <div className="page-container narrow-page">
      <header className="page-header">
        <div className="header-title">
          <Edit3 className="header-icon" />
          <div>
            <h1>Edit Issue</h1>
            <p>Update details for issue #{issue._id.slice(-6).toUpperCase()}</p>
          </div>
        </div>
        <Button variant="ghost" onClick={() => navigate(-1)} icon={<ArrowLeft size={18} />}>
          Cancel
        </Button>
      </header>

      <div className="page-card">
        <IssueForm 
          initialData={issue}
          onSubmit={handleSubmit} 
          onCancel={() => navigate(-1)} 
          loading={submitting} 
        />
      </div>
    </div>
  );
}
