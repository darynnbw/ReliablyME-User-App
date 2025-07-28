import React from 'react';
import {
  Box,
  Container,
  Grid,
} from '@mui/material';
import dayjs from 'dayjs';
import Header from '../components/Header';
import NavigationTabs from '../components/NavigationTabs';
import CommitmentsSection from '../components/CommitmentsSection';

const Actions: React.FC = () => {
  const myPromisesItems = [
    {
      id: 100,
      title: 'Mid-Week Progress',
      dueDate: 'Today',
      committedDate: 'Mar 27, 9:15 PM',
      description: 'I will respond to a nudge every Thursday to report on my mid-week progress through the end of June.',
      assignee: 'Alex Johnson',
      type: 'nudge',
      nudgesLeft: 2,
      totalNudges: 10,
      questions: [
        'What have you accomplished so far this week?',
        'What do you plan to accomplish/complete by the end of the week?',
        'What are you concerned about that might hinder your progress?',
      ],
    },
    {
      id: 99,
      title: 'Promise Kept General',
      dueDate: 'Jul 18, 2024',
      committedDate: 'Jul 15, 9:15 PM',
      description: 'I will submit the project proposal for the Q3 initiatives.',
      assignee: 'Chris Parker',
    },
    {
      id: 1,
      title: 'Teamwork',
      dueDate: dayjs().add(2, 'day').format('MMM D, hh:mm A'),
      committedDate: 'Mar 27, 9:15 PM',
      description: 'I will provide feedback on the new product design mockups for client presentation.',
      assignee: 'Riley Chen',
    },
    {
      id: 2,
      title: 'Attendance',
      dueDate: dayjs().add(3, 'day').format('MMM D, hh:mm A'),
      committedDate: 'Mar 27, 9:15 PM',
      description: 'I will deliver the quarterly marketing report with all KPIs and campaign results.',
      assignee: 'Jamie Smith',
    },
    {
      id: 6,
      title: 'Promise Kept General',
      dueDate: dayjs().add(4, 'day').format('MMM D, hh:mm A'),
      committedDate: 'Mar 27, 9:15 PM',
      description: 'I will complete the code review for the new feature branch by end of day.',
      assignee: 'Alex Johnson',
    },
    {
      id: 7,
      title: 'Teamwork',
      dueDate: dayjs().add(5, 'day').format('MMM D, hh:mm A'),
      committedDate: 'Mar 27, 9:15 PM',
      description: 'I will prepare and share the agenda for the upcoming sprint planning meeting.',
      assignee: 'Sarah Connor',
    },
    {
      id: 8,
      title: 'Attendance',
      dueDate: dayjs().add(6, 'day').format('MMM D, hh:mm A'),
      committedDate: 'Mar 27, 9:15 PM',
      description: 'I will join the all-hands meeting on time and prepared to discuss Q2 goals.',
      assignee: 'Mike Miller',
    },
  ];

  const requestsToCommitItems = [
    {
      id: 200,
      title: 'Mid-Week Progress',
      dueDate: 'Today',
      committedDate: 'Mar 27, 9:15 PM',
      description: 'I will respond to a nudge every Thursday to report on my mid-week progress through the end of June.',
      assignee: 'Alex Johnson',
      type: 'nudge',
      questions: [
        'What have you accomplished so far this week?',
        'What do you plan to accomplish/complete by the end of the week?',
        'What are you concerned about that might hinder your progress?',
      ],
    },
    {
      id: 201,
      title: 'Teamwork',
      dueDate: dayjs().add(2, 'day').format('MMM D, hh:mm A'),
      committedDate: 'Mar 27, 9:15 PM',
      description: 'I will provide feedback on the new product design mockups for client presentation.',
      assignee: 'Riley Chen',
    },
    {
      id: 202,
      title: 'Promise Kept General',
      dueDate: dayjs().add(4, 'day').format('MMM D, hh:mm A'),
      committedDate: 'Mar 30, 10:00 AM',
      description: 'I will prepare the slides for the Q2 financial review meeting.',
      assignee: 'Sarah Wilson',
    },
    {
      id: 203,
      title: 'Attendance',
      dueDate: dayjs().add(5, 'day').format('MMM D, hh:mm A'),
      committedDate: 'Apr 1, 2:00 PM',
      description: 'I will attend the project retrospective for the Alpha launch.',
      assignee: 'Mike Johnson',
    },
    {
      id: 204,
      title: 'Promise Kept General',
      dueDate: dayjs().add(6, 'day').format('MMM D, hh:mm A'),
      committedDate: 'Apr 4, 10:00 AM',
      description: 'I will provide the final invoice for the freelance design work.',
      assignee: '+1 555-123-4567',
      isExternal: true,
    },
  ];

  const myAwaitingResponseItems = [
    {
      id: 601,
      title: 'Promise Kept General',
      dueDate: 'Pending',
      committedDate: 'Requested on Jul 20, 11:00 AM',
      description: 'I will set up the new project repository and initial file structure.',
      assignee: 'Dev Team Lead',
    },
    {
      id: 602,
      title: 'Teamwork',
      dueDate: 'Pending',
      committedDate: 'Requested on Jul 19, 3:00 PM',
      description: 'I will send you the draft for the client presentation for your review.',
      assignee: 'Sarah Wilson',
    },
    {
      id: 603,
      title: 'Promise Kept General',
      dueDate: 'Pending',
      committedDate: 'Requested on Jul 21, 9:00 AM',
      description: 'I will send the new marketing assets for approval.',
      assignee: '+1 555-555-1212',
      isExternal: true,
    }
  ];

  const myCommitmentsTabs = [
    {
      label: 'My Promises',
      count: myPromisesItems.length,
      items: myPromisesItems,
    },
    {
      label: 'Requests to Commit',
      count: requestsToCommitItems.length,
      items: requestsToCommitItems,
    },
    {
      label: 'Awaiting Response',
      count: myAwaitingResponseItems.length,
      items: myAwaitingResponseItems,
    },
  ];

  const promisesOwedToMeItems = [
    {
      id: 1,
      title: 'Teamwork',
      dueDate: dayjs().add(2, 'day').format('MMM D, hh:mm A'),
      committedDate: 'Mar 27, 9:15 PM',
      description: 'I promise to provide feedback on the new product design mockups for client presentation.',
      assignee: 'Riley Chen',
    },
    {
      id: 2,
      title: 'Promise Kept General',
      dueDate: dayjs().add(4, 'day').format('MMM D, hh:mm A'),
      committedDate: 'Mar 27, 9:15 PM',
      description: 'I am going to deliver the quarterly marketing report with all KPIs and campaign results.',
      assignee: 'Jamie Smith',
    },
    {
      id: 301,
      title: 'Promise Kept General',
      dueDate: dayjs().add(1, 'day').format('MMM D, hh:mm A'),
      committedDate: 'Jul 18, 10:00 AM',
      description: 'I will provide the final invoice for the freelance design work.',
      assignee: '+1 555-987-6543',
      isExternal: true,
    },
    {
      id: 302,
      title: 'Attendance',
      dueDate: dayjs().add(3, 'day').format('MMM D, hh:mm A'),
      committedDate: 'Jul 17, 3:30 PM',
      description: 'I commit to joining the client demo call on Friday.',
      assignee: 'Chris Parker',
    },
    {
      id: 303,
      title: 'Teamwork',
      dueDate: dayjs().add(5, 'day').format('MMM D, hh:mm A'),
      committedDate: 'Jul 16, 11:00 AM',
      description: 'I plan to provide my section of the presentation slides by EOD Tuesday.',
      assignee: 'Sarah Wilson',
    }
  ];

  const badgeRequestItems = [
    {
      id: 501,
      title: 'Promise Kept General',
      dueDate: 'Completed Jul 18',
      committedDate: 'Requested on Jul 19, 2:00 PM',
      description: 'I will complete the mandatory HR compliance training course.',
      explanation: 'I have submitted the form and answered all the questions.',
      assignee: 'Chris Parker',
    },
    {
      id: 502,
      title: 'Teamwork',
      dueDate: 'Completed Jul 17',
      committedDate: 'Requested on Jul 18, 10:00 AM',
      description: 'I will collaborate with the design team on the new UI mockups.',
      explanation: 'We held a final review session and all stakeholders have signed off on the mockups.',
      assignee: 'Riley Chen',
    },
    {
      id: 503,
      title: 'Leadership',
      dueDate: 'Completed Jul 16',
      committedDate: 'Requested on Jul 17, 11:00 AM',
      description: 'I promise to lead the weekly sync meeting and ensure all action items are captured.',
      explanation: 'I led the meeting, and the minutes with action items have been circulated.',
      assignee: 'Sarah Wilson',
    },
    {
      id: 504,
      title: 'Attendance',
      dueDate: 'Completed Jul 15',
      committedDate: 'Requested on Jul 16, 9:00 AM',
      description: 'I commit to attending the full-day workshop on new project management tools.',
      explanation: 'I attended the entire workshop and have shared my notes with the team.',
      assignee: 'Mike Johnson',
    },
    {
      id: 505,
      title: 'Promise Kept General',
      dueDate: 'Completed Jul 14',
      committedDate: 'Requested on Jul 15, 3:00 PM',
      description: 'I am going to update the shared documentation with the latest API specifications.',
      explanation: 'The documentation is now up-to-date on Confluence, link has been shared in the channel.',
      assignee: 'Jamie Smith',
    },
    {
      id: 506, // New overdue item
      title: 'Teamwork',
      dueDate: 'Completed Jul 10', // A past date to make it overdue
      committedDate: 'Requested on Jul 11, 9:00 AM',
      description: 'I will assist the new intern with setting up their development environment.',
      explanation: 'I spent two hours with the intern, and they are now fully set up and ready to start coding.',
      assignee: 'Alex Johnson',
    },
  ];

  const awaitingResponseItems = [
    {
      id: 401,
      title: 'Promise Kept General',
      dueDate: 'Pending',
      committedDate: 'Requested on Jul 19, 2:00 PM',
      description: 'I plan to handle the deployment for the new feature release this weekend.',
      assignee: 'Mike Johnson',
    },
    {
      id: 402,
      title: 'Teamwork',
      dueDate: 'Pending',
      committedDate: 'Requested on Jul 18, 4:30 PM',
      description: 'I will collaborate on the Q4 roadmap document.',
      assignee: 'Riley Chen',
    },
    {
      id: 403,
      title: 'Promise Kept General',
      dueDate: 'Pending',
      committedDate: 'Requested on Jul 17, 9:00 AM',
      description: 'I will approve the budget for the new marketing campaign.',
      assignee: '+1 555-555-1212',
      isExternal: true,
    }
  ];

  const commitmentsReceivedTabs = [
    {
      label: 'Promises Owed to Me',
      count: promisesOwedToMeItems.length,
      items: promisesOwedToMeItems,
    },
    {
      label: 'Badge Requests',
      count: badgeRequestItems.length,
      items: badgeRequestItems,
    },
    {
      label: 'Awaiting Response',
      count: awaitingResponseItems.length,
      items: awaitingResponseItems,
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <NavigationTabs />

      <Container maxWidth="xl" sx={{ mt: 3, mb: 4 }}>
        <Grid container spacing={3}>
          {/* My Commitments */}
          <Grid item xs={12}>
            <CommitmentsSection title="My Commitments" tabs={myCommitmentsTabs} />
          </Grid>

          {/* Commitments from Others */}
          <Grid item xs={12}>
            <CommitmentsSection title="Commitments from Others" tabs={commitmentsReceivedTabs} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Actions;