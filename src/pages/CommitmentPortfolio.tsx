import React from 'react';
import {
  Box,
  Container,
  Grid,
} from '@mui/material';
import Header from '../components/Header';
import NavigationTabs from '../components/NavigationTabs';
import UserProfileSection from '../components/UserProfileSection';
import BadgesOverviewPanel from '../components/BadgesOverviewPanel';
import CommitmentsSection from '../components/CommitmentsSection';

const CommitmentPortfolio: React.FC = () => {
  const myCommitmentsTabs = [
    {
      label: 'My Promises',
      count: 5,
      items: [
        {
          id: 1,
          title: 'Teamwork',
          dueDate: 'Mar 28, 12:00 AM',
          committedDate: 'Mar 27, 9:15 PM',
          description: 'Need feedback on the new product design mockups for client presentation.',
          assignee: 'Riley Chen',
        },
        {
          id: 2,
          title: 'Attendance',
          dueDate: 'Due Mar 28, 12:00 AM',
          committedDate: 'Mar 27, 9:15 PM',
          description: 'Need the quarterly marketing report with all KPIs and campaign results.',
          assignee: 'Jamie Smith',
        },
        {
          id: 6,
          title: 'Promise Kept General',
          dueDate: 'Apr 02, 05:00 PM',
          committedDate: 'Mar 27, 9:15 PM',
          description: 'I will complete the code review for the new feature branch by end of day.',
          assignee: 'Alex Johnson',
        },
        {
          id: 7,
          title: 'Teamwork',
          dueDate: 'Apr 04, 10:00 AM',
          committedDate: 'Mar 27, 9:15 PM',
          description: 'Prepare and share the agenda for the upcoming sprint planning meeting.',
          assignee: 'Sarah Connor',
        },
        {
          id: 8,
          title: 'Attendance',
          dueDate: 'Apr 05, 09:00 AM',
          committedDate: 'Mar 27, 9:15 PM',
          description: 'I will join the all-hands meeting on time and prepared to discuss Q2 goals.',
          assignee: 'Mike Miller',
        },
      ],
    },
    {
      label: 'My Badges',
      count: 65,
      items: [
        { id: 101, title: 'Teamwork', dueDate: 'May 28, 12:00 AM', committedDate: 'May 27, 9:15 PM', description: 'Attended the intern meeting and provided valuable feedback.', assignee: 'Riley Chen' },
        { id: 102, title: 'Promise Kept General', dueDate: 'May 27, 09:15 PM', committedDate: 'May 27, 9:15 PM', description: 'Joined the project kickoff meeting to discuss the upcoming launch.', assignee: 'Chris Parker' },
        { id: 103, title: 'Attendance', dueDate: 'May 26, 10:00 AM', committedDate: 'May 25, 9:15 PM', description: 'Was on time for all the daily stand-ups this week.', assignee: 'Alex Johnson' },
        { id: 104, title: 'Promise Kept General', dueDate: 'May 25, 05:00 PM', committedDate: 'May 24, 9:15 PM', description: 'Completed the code review for the new feature branch.', assignee: 'Alex Johnson' },
        { id: 105, title: 'Teamwork', dueDate: 'May 24, 10:00 AM', committedDate: 'May 23, 9:15 PM', description: 'Prepared and shared the agenda for the upcoming sprint planning meeting.', assignee: 'Sarah Connor' },
        { id: 106, title: 'Attendance', dueDate: 'May 23, 09:00 AM', committedDate: 'May 22, 9:15 PM', description: 'Joined the all-hands meeting on time and prepared to discuss Q2 goals.', assignee: 'Mike Miller' },
        { id: 107, title: 'Leadership', dueDate: 'May 22, 03:00 PM', committedDate: 'May 21, 9:15 PM', description: 'Led the brainstorming session for the new marketing campaign.', assignee: 'Jamie Smith' },
        { id: 108, title: 'Promise Kept General', dueDate: 'May 21, 11:00 AM', committedDate: 'May 20, 9:15 PM', description: 'Delivered the final report on the agreed-upon deadline.', assignee: 'John Doe' },
        { id: 109, title: 'Attendance', dueDate: 'May 20, 02:00 PM', committedDate: 'May 19, 9:15 PM', description: 'Attended the critical client call and contributed positively.', assignee: 'Jane Smith' },
        { id: 110, title: 'Teamwork', dueDate: 'May 19, 06:00 PM', committedDate: 'May 18, 9:15 PM', description: 'Provided the necessary assets for the marketing campaign on time.', assignee: 'Peter Jones' },
        { id: 111, title: 'Promise Kept General', dueDate: 'May 18, 04:00 PM', committedDate: 'May 17, 9:15 PM', description: 'Submitted the expense report before the deadline.', assignee: 'Riley Chen' },
        { id: 112, title: 'Attendance', dueDate: 'May 17, 10:00 AM', committedDate: 'May 16, 9:15 PM', description: 'Was present and engaged in the weekly sync meeting.', assignee: 'Chris Parker' },
        { id: 113, title: 'Teamwork', dueDate: 'May 16, 01:00 PM', committedDate: 'May 15, 9:15 PM', description: 'Helped a new team member get up to speed on the project.', assignee: 'Alex Johnson' },
        { id: 114, title: 'Leadership', dueDate: 'May 15, 09:00 AM', committedDate: 'May 14, 9:15 PM', description: 'Mentored a junior developer and helped them solve a complex bug.', assignee: 'Sarah Connor' },
        { id: 115, title: 'Promise Kept General', dueDate: 'May 14, 02:00 PM', committedDate: 'May 13, 9:15 PM', description: 'Updated the project documentation with the latest changes.', assignee: 'Mike Miller' },
        { id: 116, title: 'Teamwork', dueDate: 'May 13, 12:00 PM', committedDate: 'May 12, 9:15 PM', description: 'Collaborated effectively with the design team on the new UI.', assignee: 'Jamie Smith' },
        { id: 117, title: 'Attendance', dueDate: 'May 12, 11:00 AM', committedDate: 'May 11, 9:15 PM', description: 'Attended the optional training session to improve skills.', assignee: 'John Doe' },
        { id: 118, title: 'Promise Kept General', dueDate: 'May 11, 03:00 PM', committedDate: 'May 10, 9:15 PM', description: 'Provided feedback on the new product design mockups.', assignee: 'Jane Smith' },
        { id: 119, title: 'Teamwork', dueDate: 'May 10, 05:00 PM', committedDate: 'May 9, 9:15 PM', description: 'Shared knowledge with the team during a brown bag session.', assignee: 'Peter Jones' },
        { id: 120, title: 'Attendance', dueDate: 'May 9, 09:30 AM', committedDate: 'May 8, 9:15 PM', description: 'Was punctual for the sprint retrospective meeting.', assignee: 'Riley Chen' },
        { id: 121, title: 'Promise Kept General', dueDate: 'May 8, 01:00 PM', committedDate: 'May 7, 9:15 PM', description: 'Responded to all high-priority emails within 24 hours.', assignee: 'Chris Parker' },
        { id: 122, title: 'Leadership', dueDate: 'May 7, 04:00 PM', committedDate: 'May 6, 9:15 PM', description: 'Took initiative to resolve a blocker for the team.', assignee: 'Alex Johnson' },
        { id: 123, title: 'Teamwork', dueDate: 'May 6, 10:00 AM', committedDate: 'May 5, 9:15 PM', description: 'Paired programmed with a colleague to solve a difficult issue.', assignee: 'Sarah Connor' },
        { id: 124, title: 'Attendance', dueDate: 'May 5, 11:00 AM', committedDate: 'May 4, 9:15 PM', description: 'Attended the company town hall meeting.', assignee: 'Mike Miller' },
        { id: 125, title: 'Promise Kept General', dueDate: 'May 4, 03:00 PM', committedDate: 'May 3, 9:15 PM', description: 'Organized the team-building activity.', assignee: 'Jamie Smith' },
        { id: 126, title: 'Teamwork', dueDate: 'May 3, 02:00 PM', committedDate: 'May 2, 9:15 PM', description: 'Contributed to the team\'s shared codebase.', assignee: 'John Doe' },
        { id: 127, title: 'Attendance', dueDate: 'May 2, 09:00 AM', committedDate: 'May 1, 9:15 PM', description: 'Was present for the entire duration of the workshop.', assignee: 'Jane Smith' },
        { id: 128, title: 'Promise Kept General', dueDate: 'May 1, 05:00 PM', committedDate: 'Apr 30, 9:15 PM', description: 'Cleaned up the project board and archived old tasks.', assignee: 'Peter Jones' },
        { id: 129, title: 'Leadership', dueDate: 'Apr 30, 10:00 AM', committedDate: 'Apr 29, 9:15 PM', description: 'Volunteered to lead the next project epic.', assignee: 'Riley Chen' },
        { id: 130, title: 'Teamwork', dueDate: 'Apr 29, 01:00 PM', committedDate: 'Apr 28, 9:15 PM', description: 'Offered constructive feedback during a peer review.', assignee: 'Chris Parker' },
        { id: 131, title: 'Attendance', dueDate: 'Apr 28, 09:00 AM', committedDate: 'Apr 27, 9:15 PM', description: 'Attended all scheduled meetings for the week.', assignee: 'Alex Johnson' },
        { id: 132, title: 'Promise Kept General', dueDate: 'Apr 27, 04:00 PM', committedDate: 'Apr 26, 9:15 PM', description: 'Followed up on all action items from the previous meeting.', assignee: 'Sarah Connor' },
        { id: 133, title: 'Teamwork', dueDate: 'Apr 26, 11:00 AM', committedDate: 'Apr 25, 9:15 PM', description: 'Helped document a new process for the team.', assignee: 'Mike Miller' },
        { id: 134, title: 'Leadership', dueDate: 'Apr 25, 02:00 PM', committedDate: 'Apr 24, 9:15 PM', description: 'Presented the team\'s achievements to senior management.', assignee: 'Jamie Smith' },
        { id: 135, title: 'Attendance', dueDate: 'Apr 24, 10:00 AM', committedDate: 'Apr 23, 9:15 PM', description: 'Was on time for the client demo.', assignee: 'John Doe' },
        { id: 136, title: 'Promise Kept General', dueDate: 'Apr 23, 03:00 PM', committedDate: 'Apr 22, 9:15 PM', description: 'Completed the mandatory security training.', assignee: 'Jane Smith' },
        { id: 137, title: 'Teamwork', dueDate: 'Apr 22, 01:00 PM', committedDate: 'Apr 21, 9:15 PM', description: 'Welcomed a new hire and helped them feel comfortable.', assignee: 'Peter Jones' },
        { id: 138, title: 'Attendance', dueDate: 'Apr 21, 09:30 AM', committedDate: 'Apr 20, 9:15 PM', description: 'Attended the cross-functional team meeting.', assignee: 'Riley Chen' },
        { id: 139, title: 'Promise Kept General', dueDate: 'Apr 20, 05:00 PM', committedDate: 'Apr 19, 9:15 PM', description: 'Reviewed and approved the pull request in a timely manner.', assignee: 'Chris Parker' },
        { id: 140, title: 'Leadership', dueDate: 'Apr 19, 02:00 PM', committedDate: 'Apr 18, 9:15 PM', description: 'Identified a potential risk and proposed a mitigation plan.', assignee: 'Alex Johnson' },
        { id: 141, title: 'Teamwork', dueDate: 'Apr 18, 11:00 AM', committedDate: 'Apr 17, 9:15 PM', description: 'Participated actively in the retrospective.', assignee: 'Sarah Connor' },
        { id: 142, title: 'Attendance', dueDate: 'Apr 17, 10:00 AM', committedDate: 'Apr 16, 9:15 PM', description: 'Attended the product roadmap presentation.', assignee: 'Mike Miller' },
        { id: 143, title: 'Promise Kept General', dueDate: 'Apr 16, 04:00 PM', committedDate: 'Apr 15, 9:15 PM', description: 'Provided a detailed status update in the project channel.', assignee: 'Jamie Smith' },
        { id: 144, title: 'Teamwork', dueDate: 'Apr 15, 01:00 PM', committedDate: 'Apr 14, 9:15 PM', description: 'Helped a colleague with their task when they were stuck.', assignee: 'John Doe' },
        { id: 145, title: 'Attendance', dueDate: 'Apr 14, 09:00 AM', committedDate: 'Apr 13, 9:15 PM', description: 'Was present for the team lunch.', assignee: 'Jane Smith' },
        { id: 146, title: 'Promise Kept General', dueDate: 'Apr 13, 03:00 PM', committedDate: 'Apr 12, 9:15 PM', description: 'Tested the new feature on a staging environment.', assignee: 'Peter Jones' },
        { id: 147, title: 'Leadership', dueDate: 'Apr 12, 11:00 AM', committedDate: 'Apr 11, 9:15 PM', description: 'Facilitated a productive discussion during a meeting.', assignee: 'Riley Chen' },
        { id: 148, title: 'Teamwork', dueDate: 'Apr 11, 02:00 PM', committedDate: 'Apr 10, 9:15 PM', description: 'Acknowledged the contributions of other team members.', assignee: 'Chris Parker' },
        { id: 149, title: 'Attendance', dueDate: 'Apr 10, 10:00 AM', committedDate: 'Apr 9, 9:15 PM', description: 'Attended the weekly project review.', assignee: 'Alex Johnson' },
        { id: 150, title: 'Promise Kept General', dueDate: 'Apr 9, 05:00 PM', committedDate: 'Apr 8, 9:15 PM', description: 'Wrote unit tests for the new code.', assignee: 'Sarah Connor' },
        { id: 151, title: 'Teamwork', dueDate: 'Apr 8, 01:00 PM', committedDate: 'Apr 7, 9:15 PM', description: 'Shared a useful article with the team.', assignee: 'Mike Miller' },
        { id: 152, title: 'Attendance', dueDate: 'Apr 7, 09:30 AM', committedDate: 'Apr 6, 9:15 PM', description: 'Was on time for the one-on-one meeting.', assignee: 'Jamie Smith' },
        { id: 153, title: 'Promise Kept General', dueDate: 'Apr 6, 04:00 PM', committedDate: 'Apr 5, 9:15 PM', description: 'Created a ticket for a bug I found.', assignee: 'John Doe' },
        { id: 154, title: 'Leadership', dueDate: 'Apr 5, 02:00 PM', committedDate: 'Apr 4, 9:15 PM', description: 'Provided clear direction to the team on a new task.', assignee: 'Jane Smith' },
        { id: 155, title: 'Teamwork', dueDate: 'Apr 4, 11:00 AM', committedDate: 'Apr 3, 9:15 PM', description: 'Celebrated a team success.', assignee: 'Peter Jones' },
        { id: 156, title: 'Attendance', dueDate: 'Apr 3, 10:00 AM', committedDate: 'Apr 2, 9:15 PM', description: 'Attended the sprint planning session.', assignee: 'Riley Chen' },
        { id: 157, title: 'Promise Kept General', dueDate: 'Apr 2, 03:00 PM', committedDate: 'Apr 1, 9:15 PM', description: 'Gave a presentation on a new technology.', assignee: 'Chris Parker' },
        { id: 158, title: 'Teamwork', dueDate: 'Apr 1, 01:00 PM', committedDate: 'Mar 31, 9:15 PM', description: 'Brainstormed ideas for the next hackathon.', assignee: 'Alex Johnson' },
        { id: 159, title: 'Attendance', dueDate: 'Mar 31, 09:00 AM', committedDate: 'Mar 30, 9:15 PM', description: 'Was present for the daily stand-up.', assignee: 'Sarah Connor' },
        { id: 160, title: 'Promise Kept General', dueDate: 'Mar 30, 05:00 PM', committedDate: 'Mar 29, 9:15 PM', description: 'Resolved a merge conflict.', assignee: 'Mike Miller' },
        { id: 161, title: 'Leadership', dueDate: 'Mar 29, 02:00 PM', committedDate: 'Mar 28, 9:15 PM', description: 'Delegated tasks effectively to team members.', assignee: 'Jamie Smith' },
        { id: 162, title: 'Teamwork', dueDate: 'Mar 28, 11:00 AM', committedDate: 'Mar 27, 9:15 PM', description: 'Provided support to a team member who was struggling.', assignee: 'John Doe' },
        { id: 163, title: 'Attendance', dueDate: 'Mar 27, 10:00 AM', committedDate: 'Mar 26, 9:15 PM', description: 'Attended the design review meeting.', assignee: 'Jane Smith' },
        { id: 164, title: 'Promise Kept General', dueDate: 'Mar 26, 04:00 PM', committedDate: 'Mar 25, 9:15 PM', description: 'Refactored a complex piece of code.', assignee: 'Peter Jones' },
        { id: 165, title: 'Teamwork', dueDate: 'Mar 25, 01:00 PM', committedDate: 'Mar 24, 9:15 PM', description: 'Helped to onboard a new team member.', assignee: 'Riley Chen' },
      ],
    },
    {
      label: 'My Unkept Promises',
      count: 3,
      items: [
        {
          id: 9,
          title: 'Promise Kept General',
          dueDate: 'Mar 20, 03:00 PM',
          committedDate: 'Mar 27, 9:15 PM',
          description: 'Failed to deliver the final report on the agreed-upon deadline.',
          assignee: 'John Doe',
        },
        {
          id: 10,
          title: 'Attendance',
          dueDate: 'Mar 22, 11:00 AM',
          committedDate: 'Mar 27, 9:15 PM',
          description: 'Missed the critical client call without prior notification.',
          assignee: 'Jane Smith',
        },
        {
          id: 11,
          title: 'Teamwork',
          dueDate: 'Mar 25, 06:00 PM',
          committedDate: 'Mar 27, 9:15 PM',
          description: 'Did not provide the necessary assets for the marketing campaign.',
          assignee: 'Peter Jones',
        },
      ],
    },
    {
      label: 'Nudges History',
      count: 4,
      items: [],
    },
  ];

  const commitmentsReceivedTabs = [
    {
      label: 'Promises Owed to Me',
      count: 2,
      items: [
        {
          id: 1,
          title: 'Teamwork',
          dueDate: 'Mar 28, 12:00 AM',
          committedDate: 'Mar 27, 9:15 PM',
          description: 'Need feedback on the new product design mockups for client presentation.',
          assignee: 'Riley Chen',
        },
        {
          id: 2,
          title: 'Promise Kept General',
          dueDate: 'Apr 15, 12:00 AM',
          committedDate: 'Mar 27, 9:15 PM',
          description: 'Need the quarterly marketing report with all KPIs and campaign results.',
          assignee: 'Jamie Smith',
        },
      ],
    },
    {
      label: 'Badges Issued',
      count: 120,
      items: [],
    },
    {
      label: 'Unkept Promises to Me',
      count: 31,
      items: [],
    },
    {
      label: 'Nudges History',
      count: 4,
      items: [],
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <NavigationTabs />

      <Container maxWidth="xl" sx={{ mt: 3, mb: 4 }}>
        <UserProfileSection name="Alex Johnson" phone="+1 (555) 123-4567" />

        <Grid container spacing={3}>
          {/* Badges Overview */}
          <Grid item xs={12} sx={{ mb: 3 }}>
            <BadgesOverviewPanel />
          </Grid>

          {/* My Commitments */}
          <Grid item xs={12}>
            <CommitmentsSection title="My Commitments" tabs={myCommitmentsTabs} />
          </Grid>

          {/* Commitments Received & Badges Issued */}
          <Grid item xs={12}>
            <CommitmentsSection title="Commitments Received & Badges Issued" tabs={commitmentsReceivedTabs} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CommitmentPortfolio;