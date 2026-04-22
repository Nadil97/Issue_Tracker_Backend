import { Link } from 'react-router-dom';
import type { Issue } from '../../types';
import { StatusBadge, PriorityBadge } from '../ui/Badge';
import { formatRelativeDate, truncate } from '../../utils/helpers';
import { ChevronRight, MessageSquare, Clock } from 'lucide-react';

interface IssueCardProps {
  issue: Issue;
}

export function IssueCard({ issue }: IssueCardProps) {
  return (
    <Link to={`/issues/${issue._id}`} className="issue-card">
      <div className="issue-card-content">
        <div className="issue-card-header">
          <div className="issue-card-title-group">
            <h3 className="issue-card-title">{issue.title}</h3>
            <div className="issue-card-meta">
              <span className="issue-id">#{issue._id.slice(-6).toUpperCase()}</span>
              <span className="issue-author">by {issue.user.name}</span>
            </div>
          </div>
          <div className="issue-card-badges">
            <PriorityBadge priority={issue.priority} />
            <StatusBadge status={issue.status} />
          </div>
        </div>
        
        <p className="issue-card-description">
          {truncate(issue.description, 120)}
        </p>
        
        <div className="issue-card-footer">
          <div className="issue-footer-left">
            <div className="issue-stat">
              <Clock size={14} className="icon" />
              <span>{formatRelativeDate(issue.createdAt)}</span>
            </div>
          </div>
          <div className="view-details">
            <span>View Details</span>
            <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </Link>
  );
}
