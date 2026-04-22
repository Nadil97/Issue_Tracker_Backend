import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useIssue } from '../hooks/useIssue';
import { StatusBadge, PriorityBadge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ConfirmModal } from '../components/ui/Modal';
import { Spinner } from '../components/ui/Spinner';
import { formatDate, formatRelativeDate } from '../utils/helpers';
import { 
  ArrowLeft, Edit, Trash2, CheckCircle2, 
  Calendar, User, Clock, AlertTriangle 
} from 'lucide-react';

export default function IssueDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { issue, loading, submitting, error, deleteIssue, updateIssue } = useIssue(id);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showResolveModal, setShowResolveModal] = useState(false);

  if (loading) return <div className="page-loading"><Spinner size="lg" text="Loading issue details..." /></div>;
  if (error || !issue) return (
    <div className="page-error">
      <AlertTriangle size={48} />
      <h2>Error</h2>
      <p>{error || 'Issue not found'}</p>
      <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
    </div>
  );

  const handleDelete = async () => {
    try {
      await deleteIssue(issue._id);
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to delete issue', err);
    }
  };

  const handleResolve = async () => {
    try {
      await updateIssue(issue._id, { status: 'Resolved' });
      setShowResolveModal(false);
    } catch (err) {
      console.error('Failed to resolve issue', err);
    }
  };

  return (
    <div className="page-container">
      <div className="detail-header">
        <Button variant="ghost" onClick={() => navigate(-1)} icon={<ArrowLeft size={18} />}>
          Back
        </Button>
        <div className="detail-actions">
          {issue.status !== 'Resolved' && (
            <Button 
              variant="success" 
              onClick={() => setShowResolveModal(true)} 
              icon={<CheckCircle2 size={18} />}
            >
              Mark as Resolved
            </Button>
          )}
          <Link to={`/issues/${issue._id}/edit`}>
            <Button variant="secondary" icon={<Edit size={18} />}>Edit</Button>
          </Link>
          <Button variant="danger" onClick={() => setShowDeleteModal(true)} icon={<Trash2 size={18} />}>
            Delete
          </Button>
        </div>
      </div>

      <div className="detail-body">
        <div className="detail-main">
          <div className="detail-title-section">
            <div className="detail-id">#{issue._id.slice(-6).toUpperCase()}</div>
            <h1>{issue.title}</h1>
            <div className="detail-badges">
              <StatusBadge status={issue.status} />
              <PriorityBadge priority={issue.priority} />
            </div>
          </div>

          <div className="detail-card">
            <h3>Description</h3>
            <div className="detail-description">
              {issue.description.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="detail-sidebar">
          <div className="detail-card sidebar-info">
            <h3>Information</h3>
            <div className="info-list">
              <div className="info-item">
                <User size={16} />
                <div>
                  <label>Reported by</label>
                  <span>{issue.user.name}</span>
                </div>
              </div>
              <div className="info-item">
                <User size={16} />
                <div>
                  <label>Assignees</label>
                  <span>
                    {issue.assignees && issue.assignees.length > 0
                      ? issue.assignees.map(a => a.name).join(', ')
                      : 'Unassigned'}
                  </span>
                </div>
              </div>
              <div className="info-item">
                <Calendar size={16} />
                <div>
                  <label>Created on</label>
                  <span>{formatDate(issue.createdAt)}</span>
                </div>
              </div>
              <div className="info-item">
                <Clock size={16} />
                <div>
                  <label>Last updated</label>
                  <span>{formatRelativeDate(issue.updatedAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Issue"
        message="Are you sure you want to delete this issue? This action cannot be undone."
        confirmLabel="Delete"
        loading={submitting}
      />

      <ConfirmModal
        isOpen={showResolveModal}
        onClose={() => setShowResolveModal(false)}
        onConfirm={handleResolve}
        title="Resolve Issue"
        message="Would you like to mark this issue as resolved?"
        confirmLabel="Resolve"
        variant="success"
        loading={submitting}
      />
    </div>
  );
}
