import React from 'react';
import { Dayjs } from 'dayjs';
import CommitmentDetailsModal from './CommitmentDetailsModal';
import RequestBadgeModal from './RequestBadgeModal';
import BulkRequestBadgeModal from './BulkRequestBadgeModal';
import MyBadgeDetailsModal from './MyBadgeDetailsModal';
import AcceptRequestModal from './AcceptRequestModal';
import DeclineModal from './DeclineModal';
import BulkAcceptModal from './BulkAcceptModal';
import AnswerNudgeModal from './AnswerNudgeModal';
import NudgeDetailsModal from './NudgeDetailsModal';
import AcceptNudgeModal from './AcceptNudgeModal';
import RequestClarificationModal from './RequestClarificationModal';
import BulkClarifyModal from './BulkClarifyModal';
import SuccessConfirmationModal from './SuccessConfirmationModal';
import BadgeRequestDetailsModal from './BadgeRequestDetailsModal';
import ConfirmationModal from './ConfirmationModal';
import CommitmentActionModal from './CommitmentActionModal';
import { Typography } from '@mui/material';

interface Commitment {
  id: number;
  title: string;
  dueDate: string;
  description: string;
  assignee: string;
  selected?: boolean;
  committedDate?: string;
  approvedDate?: string;
  type?: string;
  isExternal?: boolean;
  explanation?: string;
}

interface ModalState {
  details: { open: boolean; commitment: Commitment | null };
  requestBadge: { open: boolean };
  bulkRequestBadge: { open: boolean };
  badgeDetails: { open: boolean; badge: Commitment | null };
  badgeRequestDetails: { open: boolean; commitment: Commitment | null };
  accept: { open: boolean; commitment: Commitment | null };
  acceptNudge: { open: boolean; commitment: Commitment | null };
  bulkDecline: { open: boolean };
  individualDecline: { open: boolean; commitment: Commitment | null };
  revoke: { open: boolean; commitment: Commitment | null };
  clarify: { open: boolean; commitment: Commitment | null };
  bulkAccept: { open: boolean };
  answerNudge: { open: boolean; commitment: Commitment | null };
  nudgeDetails: { open: boolean; commitment: Commitment | null };
  bulkClarify: { open: boolean };
  bulkRevoke: { open: boolean };
  approvalSuccess: { open: boolean; requester: string };
  rejectBadge: { open: boolean; commitment: Commitment | null };
  bulkApprove: { open: boolean };
  bulkReject: { open: boolean };
  bulkApprovalSuccess: { open: boolean };
  clarificationSuccess: { open: boolean };
  makePromise: { open: boolean; type: 'promise' | 'request' };
}

interface CommitmentModalsProps {
  modalState: ModalState;
  closeModal: (modalName: keyof ModalState) => void;
  setCommitments: React.Dispatch<React.SetStateAction<Commitment[]>>;
  selectedCommitments: Commitment[];
  onDetailsModalRequestBadge: () => void;
  onDetailsModalAccept: (item: Commitment) => void;
  onDetailsModalDecline: (item: Commitment) => void;
  onDetailsModalRevoke: (item: Commitment) => void;
  onDetailsModalClarify: (item: Commitment) => void;
  isCommitmentPortfolioPage: boolean;
  isRequestsToCommitTab: boolean;
  isAwaitingResponseTab: boolean;
  isOwedToMe: boolean;
}

const CommitmentModals: React.FC<CommitmentModalsProps> = ({
  modalState,
  closeModal,
  setCommitments,
  selectedCommitments,
  onDetailsModalRequestBadge,
  onDetailsModalAccept,
  onDetailsModalDecline,
  onDetailsModalRevoke,
  onDetailsModalClarify,
  isCommitmentPortfolioPage,
  isRequestsToCommitTab,
  isAwaitingResponseTab,
  isOwedToMe,
}) => {
  const selectedCount = selectedCommitments.length;

  const handleCommit = (date: Dayjs | null, time: Dayjs | null) => {
    console.log('Committed with date:', date?.format(), 'and time:', time?.format());
  };

  const handleConfirmIndividualDecline = () => {
    console.log('Declining commitment:', modalState.individualDecline.commitment?.id);
    closeModal('individualDecline');
  };

  const handleConfirmRevoke = () => {
    console.log('Revoking commitment:', modalState.revoke.commitment?.id);
    closeModal('revoke');
  };

  const handleSendClarification = (message: string) => {
    console.log(`Clarification request for ${modalState.clarify.commitment?.id}: ${message}`);
    closeModal('clarify');
    // In a real app, you would likely show a success message here.
  };

  const handleConfirmBulkDecline = () => {
    console.log('Bulk declining commitments:', selectedCommitments.map(c => c.id));
    closeModal('bulkDecline');
  };

  const handleConfirmBulkRevoke = () => {
    console.log('Bulk revoking commitments:', selectedCommitments.map(c => c.id));
    closeModal('bulkRevoke');
  };

  const handleConfirmBulkApprove = () => {
    const selectedIds = selectedCommitments.map(c => c.id);
    console.log('Bulk approving commitments:', selectedIds);
    setCommitments(prev => prev.filter(c => !selectedIds.includes(c.id)));
    closeModal('bulkApprove');
  };

  const handleConfirmBulkReject = () => {
    console.log('Bulk rejecting commitments:', selectedCommitments.map(c => c.id));
    const selectedIds = selectedCommitments.map(c => c.id);
    setCommitments(prev => prev.filter(c => !selectedIds.includes(c.id)));
    closeModal('bulkReject');
  };

  return (
    <>
      <CommitmentDetailsModal
        open={modalState.details.open}
        onClose={() => closeModal('details')}
        commitment={modalState.details.commitment}
        isRequest={isRequestsToCommitTab}
        onAcceptRequestClick={() => onDetailsModalAccept(modalState.details.commitment!)}
        onDeclineRequestClick={() => onDetailsModalDecline(modalState.details.commitment!)}
        onRequestBadgeClick={onDetailsModalRequestBadge}
        isAwaitingResponse={isAwaitingResponseTab}
        isOwedToMe={isOwedToMe}
        onRevokeClick={() => onDetailsModalRevoke(modalState.details.commitment!)}
        onClarifyClick={() => onDetailsModalClarify(modalState.details.commitment!)}
        isCommitmentPortfolioPage={isCommitmentPortfolioPage}
      />
      <NudgeDetailsModal
        open={modalState.nudgeDetails.open}
        onClose={() => closeModal('nudgeDetails')}
        commitment={modalState.nudgeDetails.commitment}
        onAnswerNudgeClick={() => { closeModal('nudgeDetails'); /* open answer modal */ }}
        isRequest={isRequestsToCommitTab}
        onAcceptClick={() => { closeModal('nudgeDetails'); /* open accept modal */ }}
        onDeclineClick={() => { closeModal('nudgeDetails'); /* open decline modal */ }}
      />
      <BadgeRequestDetailsModal
        open={modalState.badgeRequestDetails.open}
        onClose={() => closeModal('badgeRequestDetails')}
        commitment={modalState.badgeRequestDetails.commitment}
        onApprove={() => {
          setCommitments(prev => prev.filter(c => c.id !== modalState.badgeRequestDetails.commitment?.id));
          closeModal('badgeRequestDetails');
        }}
        onReject={() => {
          setCommitments(prev => prev.filter(c => c.id !== modalState.badgeRequestDetails.commitment?.id));
          closeModal('badgeRequestDetails');
        }}
      />
      <RequestBadgeModal open={modalState.requestBadge.open} onClose={() => closeModal('requestBadge')} />
      <BulkRequestBadgeModal open={modalState.bulkRequestBadge.open} onClose={() => closeModal('bulkRequestBadge')} commitments={selectedCommitments} isOwedToMe={isOwedToMe} />
      <MyBadgeDetailsModal
        open={modalState.badgeDetails.open}
        onClose={() => closeModal('badgeDetails')}
        badge={modalState.badgeDetails.badge ? {
          title: modalState.badgeDetails.badge.title,
          approvalDate: modalState.badgeDetails.badge.approvedDate || 'N/A',
          originalDueDate: modalState.badgeDetails.badge.dueDate,
          commitment: modalState.badgeDetails.badge.description,
          recipient: modalState.badgeDetails.badge.assignee,
          committedDate: modalState.badgeDetails.badge.committedDate,
        } : null}
      />
      <AcceptRequestModal open={modalState.accept.open} onClose={() => closeModal('accept')} onCommit={handleCommit} commitmentDescription={modalState.accept.commitment?.description || ''} />
      <AcceptNudgeModal open={modalState.acceptNudge.open} onClose={() => closeModal('acceptNudge')} onCommit={handleCommit} commitmentDescription={modalState.acceptNudge.commitment?.description || ''} />
      <DeclineModal open={modalState.bulkDecline.open} onClose={() => closeModal('bulkDecline')} title="Decline Invitations" description={<Typography variant="body1" sx={{ mb: 4 }}>Are you sure you want to decline {selectedCount} selected invitation{selectedCount > 1 ? 's' : ''}? This action cannot be undone.</Typography>} onDecline={handleConfirmBulkDecline} />
      <DeclineModal open={modalState.individualDecline.open} onClose={() => closeModal('individualDecline')} title="Decline Invitation" description={<Typography variant="body1" sx={{ mb: 4 }}>Are you sure you want to decline this invitation? This action cannot be undone.</Typography>} onDecline={handleConfirmIndividualDecline} />
      <DeclineModal open={modalState.revoke.open} onClose={() => closeModal('revoke')} title="Revoke Request" description={<Typography variant="body1" sx={{ mb: 4 }}>Are you sure you want to revoke this commitment request? This action cannot be undone.</Typography>} onDecline={handleConfirmRevoke} declineText="Revoke" />
      <DeclineModal open={modalState.bulkRevoke.open} onClose={() => closeModal('bulkRevoke')} title="Bulk Revoke" description={<Typography variant="body1" sx={{ mb: 4 }}>Are you sure you want to revoke {selectedCount} selected request{selectedCount > 1 ? 's' : ''}? This action cannot be undone.</Typography>} onDecline={handleConfirmBulkRevoke} declineText="Revoke" />
      <RequestClarificationModal open={modalState.clarify.open} onClose={() => closeModal('clarify')} notification={modalState.clarify.commitment} onSend={handleSendClarification} />
      <BulkClarifyModal open={modalState.bulkClarify.open} onClose={() => closeModal('bulkClarify')} commitments={selectedCommitments} />
      <BulkAcceptModal open={modalState.bulkAccept.open} onClose={() => closeModal('bulkAccept')} commitments={selectedCommitments} />
      <AnswerNudgeModal open={modalState.answerNudge.open} onClose={() => closeModal('answerNudge')} commitment={modalState.answerNudge.commitment} />
      <SuccessConfirmationModal open={modalState.approvalSuccess.open} onClose={() => closeModal('approvalSuccess')} title="Badge Approved!" message={`${modalState.approvalSuccess.requester || 'The user'} has been notified.`} />
      <SuccessConfirmationModal open={modalState.bulkApprovalSuccess.open} onClose={() => closeModal('bulkApprovalSuccess')} title="Badges Approved!" message={`${selectedCount} ${selectedCount === 1 ? 'person has' : 'people have'} been notified.`} />
      <SuccessConfirmationModal open={modalState.clarificationSuccess.open} onClose={() => closeModal('clarificationSuccess')} title="Request Sent!" message="The clarification request has been sent." />
      <DeclineModal open={modalState.rejectBadge.open} onClose={() => closeModal('rejectBadge')} title="Reject Badge Request" description={<Typography variant="body1" sx={{ mb: 4 }}>Are you sure you want to reject this badge request? The sender will be notified.</Typography>} onDecline={() => { console.log('Rejecting badge'); closeModal('rejectBadge'); }} />
      <ConfirmationModal open={modalState.bulkApprove.open} onClose={() => closeModal('bulkApprove')} title="Bulk Approve Requests" description={<Typography variant="body1" sx={{ mb: 4 }}>Are you sure you want to approve {selectedCount} selected badge request{selectedCount > 1 ? 's' : ''}?</Typography>} onConfirm={handleConfirmBulkApprove} confirmText="Approve" confirmColor="success" />
      <ConfirmationModal open={modalState.bulkReject.open} onClose={() => closeModal('bulkReject')} title="Bulk Reject Requests" description={<Typography variant="body1" sx={{ mb: 4 }}>Are you sure you want to reject {selectedCount} selected badge request{selectedCount > 1 ? 's' : ''}?</Typography>} onConfirm={handleConfirmBulkReject} confirmText="Reject" confirmColor="error" />
      <CommitmentActionModal open={modalState.makePromise.open} onClose={() => closeModal('makePromise')} type={modalState.makePromise.type} />
    </>
  );
};

export default CommitmentModals;