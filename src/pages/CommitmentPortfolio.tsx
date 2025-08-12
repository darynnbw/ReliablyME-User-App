import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
} from '@mui/material';
import dayjs from 'dayjs';
import Header from '../components/Header';
import NavigationTabs from '../components/NavigationTabs';
import UserProfileSection from '../components/UserProfileSection';
import BadgesOverviewPanel from '../components/BadgesOverviewPanel';
import CommitmentsSection from '../components/CommitmentsSection';
import AccomplishmentsOverviewPanel from '../components/AccomplishmentsOverviewPanel';
import YourStatisticsPanel from '../components/YourStatisticsPanel';
import ExportWizardModal from '../components/ExportWizardModal'; // Import the new wizard

const CommitmentPortfolio: React.FC = () => {
  const [displayMode, setDisplayMode] = useState<'regular' | 'table'>('regular');
  const [exportWizardOpen, setExportWizardOpen] = useState(false); // State for the export wizard

  // Consolidated source for all my promises, including those that might become badges or unkept
  const allMyPromisesSource = [
    {
      id: 53,
      title: 'On Track (Mid-Week Progress)',
      dueDate: dayjs().add(3, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(2, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined,
      description: 'I will provide a mid-week progress report to ensure alignment and address any blockers.',
      assignee: 'Alex Johnson',
      type: 'nudge',
      nudgesLeft: 8,
      totalNudges: 12,
      responses: [
        {
          date: dayjs().subtract(5, 'day').format('MMM D, YYYY'),
          answer: 'Progress is on track. Completed the initial draft of the report. No blockers currently.',
          questions: [
            '1. What have you accomplished so far this week?',
            '2. What do you plan to accomplish/complete by the end of the week?',
            '3. What are you concerned about that might hinder your progress?',
          ],
        },
        {
          date: dayjs().subtract(12, 'day').format('MMM D, YYYY'),
          answer: 'Finalized the data collection phase. Will start drafting the report tomorrow. Awaiting input from the marketing team.',
          questions: [
            '1. What have you accomplished so far this week?',
            '2. What do you plan to accomplish/complete by the end of the week?',
            '3. What are you concerned about that might hinder your progress?',
          ],
        },
      ],
    },
    {
      id: 100,
      title: 'Weekly Progress Check-in',
      dueDate: dayjs().add(1, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'), // Updated to a future date
      committedDate: dayjs().subtract(4, 'day').hour(9).minute(30).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(1, 'day').hour(18).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will provide a weekly progress update.',
      assignee: 'Alex Johnson',
      type: 'nudge',
      nudgesLeft: 0, // Set to 0 as it's approved
      totalNudges: 12, // Assuming 12 was the original total
      responses: [
        { 
          date: dayjs().subtract(1, 'day').format('MMM D, YYYY'), 
          answer: 'Completed tasks A, B, C. Planning to finish D and E. Concerned about resource allocation for F.',
          questions: [
            '1. What have you accomplished so far this week?',
            '2. What do you plan to accomplish/complete by the end of the week?',
            '3. What are you concerned about that might hinder your progress?',
          ]
        },
        { 
          date: dayjs().subtract(8, 'day').format('MMM D, YYYY'), 
          answer: 'Finished initial setup for project X. Next, I will start coding module Y. No major concerns at the moment.',
          questions: [
            '1. What have you accomplished so far this week?',
            '2. What do you plan to accomplish/complete by the end of the week?',
            '3. What are you concerned about that might hinder your progress?',
          ]
        },
        { 
          date: dayjs().subtract(15, 'day').format('MMM D, YYYY'), 
          answer: 'Successfully onboarded new team member. Will focus on documentation next. Minor delay due to software update.',
          questions: [
            '1. What have you accomplished so far this week?',
            '2. What do you plan to accomplish/complete by the end of the week?',
            '3. What are you concerned about that might hinder your progress?',
          ]
        },
        { 
          date: dayjs().subtract(22, 'day').format('MMM D, YYYY'), 
          answer: 'Reviewed client feedback and integrated changes. Preparing for next sprint. Need clarification on feature Z.',
          questions: [
            '1. What have you accomplished so far this week?',
            '2. What do you plan to accomplish/complete by the end of the week?',
            '3. What are you concerned about that might hinder your progress?',
          ]
        },
      ],
    },
    {
      id: 52,
      title: 'Communication Effectiveness - Nudging',
      dueDate: dayjs().endOf('month').format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().startOf('month').subtract(1, 'month').format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(1, 'day').format('MMM D, YYYY, hh:mm A'),
      description: 'I will respond to all messages and notifications constructively within 6 hours of them being sent by responding daily (weekdays) to communication-related nudges through the end of August.',
      assignee: 'Alex Johnson',
      type: 'nudge',
      nudgesLeft: 0,
      totalNudges: 44,
      responses: [
        { 
          date: dayjs().subtract(1, 'day').format('MMM D, YYYY'), 
          answer: 'I made sure to re-read my messages for tone before sending. I responded to the project update email from Sarah within 2 hours.',
          questions: ['Did you re-read your responses before sending them to ensure they were constructive? Have you replied to all time-sensitive requests today?']
        },
        { 
          date: dayjs().subtract(2, 'day').format('MMM D, YYYY'), 
          answer: 'I used positive language and offered solutions instead of just pointing out problems. I replied to the client query that came in at 10 AM by 11:30 AM.',
          questions: ['Were your responses constructive and respectful? Did you follow up on any messages that still require your input?']
        },
        { 
          date: dayjs().subtract(3, 'day').format('MMM D, YYYY'), 
          answer: 'I focused on being clear and concise to avoid back-and-forth. I answered the Slack message from the design team about the mockups in under an hour.',
          questions: ['Were you clear and concise in your replies? Did you review all communication channels (email, messenger, Slack, etc.) today?']
        }
      ],
    },
    {
      id: 99,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(5, 'day').hour(14).minute(15).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(8, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(4, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will submit the Q3 project proposal.',
      explanation: 'The Q3 project proposal was submitted on time, incorporating all stakeholder feedback and outlining clear objectives for the upcoming quarter.', // Added explanation
      assignee: 'Chris Parker',
    },
    {
      id: 1,
      title: 'Teamwork',
      dueDate: dayjs().add(2, 'day').hour(11).minute(45).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(6, 'day').hour(16).minute(20).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I am going to provide feedback on new product designs.',
      assignee: 'Riley Chen',
    },
    {
      id: 2,
      title: 'Attendance',
      dueDate: dayjs().subtract(7, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(10, 'day').hour(13).minute(5).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(6, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will deliver the quarterly marketing report with all KPIs and campaign results. This report needs to be exceptionally detailed, covering all aspects of our Q2 performance and providing actionable insights for the next quarter\'s strategy.',
      explanation: 'The quarterly marketing report was delivered on time, including all KPIs and campaign results, providing actionable insights for the next quarter\'s strategy.',
      assignee: 'Jamie Smith',
    },
    {
      id: 6,
      title: 'Promise Kept General',
      dueDate: dayjs().add(3, 'day').hour(18).minute(30).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(5, 'day').hour(11).minute(10).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will complete the code review for the new feature branch.',
      assignee: 'Alex Johnson',
    },
    {
      id: 7,
      title: 'Teamwork',
      dueDate: dayjs().add(4, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(9, 'day').hour(15).minute(40).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I plan to prepare and share the agenda for the upcoming sprint planning meeting. It must include time slots for each topic and a list of pre-reading materials for all attendees.',
      assignee: 'Sarah Connor',
    },
    {
      id: 8,
      title: 'Attendance',
      dueDate: dayjs().subtract(5, 'day').hour(8).minute(15).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(7, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(4, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will join the all-hands meeting on time.',
      explanation: 'I joined the all-hands meeting on time and actively participated in the discussions, providing valuable insights.',
      assignee: 'Mike Miller',
    },
    {
      id: 12,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(6, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(11, 'day').hour(9).minute(45).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(5, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will finalize the budget proposal.',
      explanation: 'The budget proposal was finalized and submitted ahead of schedule, ensuring all financial requirements were met.',
      assignee: 'Chris Parker',
    },
    {
      id: 13,
      title: 'Teamwork',
      dueDate: dayjs().add(7, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(12, 'day').hour(17).minute(30).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I am going to onboard the new team member.',
      assignee: 'Riley Chen',
    },
    {
      id: 14,
      title: 'Attendance',
      dueDate: dayjs().add(8, 'day').hour(10).minute(30).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(13, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will attend the weekly project sync.',
      assignee: 'Jamie Smith',
    },
    {
      id: 15,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(3, 'day').hour(23).minute(59).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(3, 'day').hour(21).minute(59).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will complete the full security audit report for the main application by the end of the week, identifying all critical and high-priority vulnerabilities and recommending actionable mitigation strategies to the security team.',
      assignee: 'Alex Johnson',
      isOverdue: true,
    },
    {
      id: 16,
      title: 'Leadership',
      dueDate: dayjs().add(9, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(14, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(8, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will lead the brainstorming session.',
      explanation: 'I successfully led the brainstorming session, resulting in several innovative ideas for the new product feature.',
      assignee: 'Sarah Connor',
    },
    {
      id: 17,
      title: 'Promise Kept General',
      dueDate: dayjs().add(10, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(15, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(9, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I am going to review new UI/UX designs.',
      explanation: 'I completed the review of the new UI/UX designs, providing detailed feedback for improvements.',
      assignee: 'Mike Miller',
    },
    {
      id: 18,
      title: 'Attendance',
      dueDate: dayjs().add(11, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(16, 'day').hour(8).minute(30).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(10, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will be present for the client demo call.',
      explanation: 'I was present for the client demo call and actively contributed to the discussion, addressing all client queries.',
      assignee: 'Chris Parker',
    },
    {
      id: 19,
      title: 'Teamwork',
      dueDate: dayjs().add(12, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(17, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(11, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will help debug the critical production issue.',
      explanation: 'I successfully helped debug the critical production issue, ensuring minimal downtime and restoring service quickly.',
      assignee: 'Riley Chen',
    },
    {
      id: 20,
      title: 'Promise Kept General',
      dueDate: dayjs().add(13, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(18, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(12, 'day').hour(18).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will prepare the quarterly business review (QBR) presentation for all key stakeholders, summarizing our major achievements, the challenges we faced, and the strategic roadmap for the next two quarters.',
      explanation: 'The QBR presentation was prepared and delivered to all key stakeholders, effectively summarizing achievements and outlining the strategic roadmap.',
      assignee: 'Jamie Smith',
    },
    {
      id: 21,
      title: 'Attendance',
      dueDate: dayjs().add(14, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(19, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(13, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will attend the company-wide training session on new software tools.',
      explanation: 'I attended the company-wide training session on new software tools and gained valuable knowledge for my role.',
      assignee: 'Alex Johnson',
    },
    {
      id: 22,
      title: 'Promise Kept General',
      dueDate: dayjs().add(15, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(20, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(14, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I plan to update the project roadmap document.',
      explanation: 'The project roadmap document was updated with the latest milestones and timelines, ensuring clarity for the team.',
      assignee: 'Sarah Connor',
    },
    {
      id: 23,
      title: 'Teamwork',
      dueDate: dayjs().add(16, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(21, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(15, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will provide constructive feedback during the peer code review session.',
      explanation: 'I provided constructive feedback during the peer code review session, helping to improve code quality and maintainability.',
      assignee: 'Mike Miller',
    },
    {
      id: 24,
      title: 'Promise Kept General',
      dueDate: dayjs().add(17, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(22, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(16, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will research and propose new technologies for our backend infrastructure.',
      explanation: 'I researched and proposed new technologies for the backend infrastructure, identifying solutions that could enhance performance and scalability.',
      assignee: 'Chris Parker',
    },
    {
      id: 25,
      title: 'Attendance',
      dueDate: dayjs().add(18, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(23, 'day').hour(8).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(17, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will participate actively in the daily stand-up meetings.',
      explanation: 'I actively participated in all daily stand-up meetings, providing timely updates and collaborating with the team.',
      assignee: 'Riley Chen',
    },
    {
      id: 26,
      title: 'Promise Kept General',
      dueDate: dayjs().add(19, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(24, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(18, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I am going to prepare and deliver a presentation on recent industry trends.',
      explanation: 'I prepared and delivered a comprehensive presentation on recent industry trends, providing valuable insights to the team.',
      assignee: 'Jamie Smith',
    },
    {
      id: 27,
      title: 'Teamwork',
      dueDate: dayjs().add(20, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(25, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(19, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will assist the QA team in testing the new features before release.',
      explanation: 'I assisted the QA team in thoroughly testing the new features, ensuring a smooth release and high quality.',
      assignee: 'Alex Johnson',
    },
    {
      id: 28,
      title: 'Promise Kept General',
      dueDate: dayjs().add(21, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(26, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(20, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will document the new API endpoints for external developers.',
      explanation: 'I documented the new API endpoints comprehensively, making it easier for external developers to integrate with our system.',
      assignee: 'Sarah Connor',
    },
    {
      id: 29,
      title: 'Attendance',
      dueDate: dayjs().add(22, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(27, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(21, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will attend the weekly leadership meeting and provide updates on my team\'s progress.',
      explanation: 'I attended the weekly leadership meeting and provided clear, concise updates on my team\'s progress and challenges.',
      assignee: 'Mike Miller',
    },
    {
      id: 30,
      title: 'Promise Kept General',
      dueDate: dayjs().add(23, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(28, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(22, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will review and approve the new marketing collateral.',
      explanation: 'I reviewed and approved the new marketing collateral, ensuring it aligned with brand guidelines and campaign objectives.',
      assignee: 'Chris Parker',
    },
    {
      id: 31,
      title: 'Teamwork',
      dueDate: dayjs().add(24, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(29, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(23, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will collaborate with the sales team to develop new client proposals.',
      explanation: 'I collaborated effectively with the sales team to develop compelling new client proposals, contributing to successful client acquisitions.',
      assignee: 'Riley Chen',
    },
    {
      id: 32,
      title: 'Promise Kept General',
      dueDate: dayjs().add(25, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(30, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(24, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will prepare a detailed report on customer feedback and suggestions.',
      explanation: 'I prepared a detailed report on customer feedback and suggestions, providing actionable insights for product improvements.',
      assignee: 'Jamie Smith',
    },
    {
      id: 33,
      title: 'Attendance',
      dueDate: dayjs().add(26, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(31, 'day').hour(8).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(25, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will ensure timely attendance at all scheduled client meetings.',
      explanation: 'I ensured timely attendance at all scheduled client meetings, maintaining professionalism and punctuality.',
      assignee: 'Alex Johnson',
    },
    {
      id: 34,
      title: 'Promise Kept General',
      dueDate: dayjs().add(27, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(32, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(26, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will conduct a training session for new employees on our internal tools.',
      explanation: 'I conducted a comprehensive training session for new employees on internal tools, ensuring their quick onboarding and productivity.',
      assignee: 'Sarah Connor',
    },
    {
      id: 35,
      title: 'Teamwork',
      dueDate: dayjs().add(28, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(33, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(27, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will assist in organizing the company\'s annual team-building event.',
      explanation: 'I assisted in organizing the company\'s annual team-building event, contributing to its success and positive employee feedback.',
      assignee: 'Mike Miller',
    },
    {
      id: 36,
      title: 'Promise Kept General',
      dueDate: dayjs().add(29, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(34, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(28, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will develop and implement a new feature for the mobile application.',
      explanation: 'I successfully developed and implemented a new feature for the mobile application, enhancing user experience and functionality.',
      assignee: 'Chris Parker',
    },
    {
      id: 37,
      title: 'Attendance',
      dueDate: dayjs().add(30, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(35, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(29, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will attend the industry conference to gather insights on emerging trends.',
      explanation: 'I attended the industry conference and gathered valuable insights on emerging trends, which I shared with the team.',
      assignee: 'Riley Chen',
    },
    {
      id: 38,
      title: 'Promise Kept General',
      dueDate: dayjs().add(31, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(36, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(30, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will prepare a detailed financial forecast for the next fiscal year.',
      explanation: 'I prepared a detailed financial forecast for the next fiscal year, providing a clear financial outlook for the company.',
      assignee: 'Jamie Smith',
    },
    {
      id: 39,
      title: 'Teamwork',
      dueDate: dayjs().add(32, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(37, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(31, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will collaborate with cross-functional teams to streamline our workflow.',
      explanation: 'I collaborated with cross-functional teams to successfully streamline our workflow, improving efficiency and communication.',
      assignee: 'Alex Johnson',
    },
    {
      id: 40,
      title: 'Promise Kept General',
      dueDate: dayjs().add(33, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(38, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(32, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will conduct a thorough market analysis for our new product launch.',
      explanation: 'I conducted a thorough market analysis for our new product launch, providing key insights into market trends and competitive landscape.',
      assignee: 'Sarah Connor',
    },
    {
      id: 41,
      title: 'Attendance',
      dueDate: dayjs().add(34, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(39, 'day').hour(8).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(33, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will ensure my presence at all mandatory company-wide meetings.',
      explanation: 'I attended all mandatory company-wide meetings, staying informed and contributing to important discussions.',
      assignee: 'Mike Miller',
    },
    {
      id: 42,
      title: 'Promise Kept General',
      dueDate: dayjs().add(35, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(40, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(34, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will design and implement a new database schema for improved performance.',
      explanation: 'I designed and implemented a new database schema, resulting in improved performance and data integrity.',
      assignee: 'Chris Parker',
    },
    {
      id: 43,
      title: 'Teamwork',
      dueDate: dayjs().add(36, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(41, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(35, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will provide support to colleagues facing technical challenges.',
      explanation: 'I provided effective support to colleagues facing technical challenges, helping them resolve issues and continue their work.',
      assignee: 'Riley Chen',
    },
    {
      id: 44,
      title: 'Promise Kept General',
      dueDate: dayjs().add(37, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(42, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(36, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will prepare a detailed report on the effectiveness of our recent marketing campaigns.',
      explanation: 'I prepared a detailed report on the effectiveness of our recent marketing campaigns, highlighting key successes and areas for improvement.',
      assignee: 'Jamie Smith',
    },
    {
      id: 45,
      title: 'Attendance',
      dueDate: dayjs().add(38, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(43, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(37, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will attend all scheduled client presentations and contribute to discussions.',
      explanation: 'I attended all scheduled client presentations and actively contributed to discussions, addressing client concerns effectively.',
      assignee: 'Alex Johnson',
    },
    {
      id: 46,
      title: 'Promise Kept General',
      dueDate: dayjs().add(39, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(44, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(38, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will develop and deploy a new microservice to enhance system scalability.',
      explanation: 'I developed and deployed a new microservice, significantly enhancing system scalability and performance.',
      assignee: 'Sarah Connor',
    },
    {
      id: 47,
      title: 'Teamwork',
      dueDate: dayjs().add(40, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(45, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(39, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will actively participate in team discussions and contribute innovative ideas.',
      explanation: 'I actively participated in team discussions, contributing innovative ideas that led to significant project improvements.',
      assignee: 'Mike Miller',
    },
    {
      id: 48,
      title: 'Promise Kept General',
      dueDate: dayjs().add(41, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(46, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(40, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will conduct a thorough review of all legal documents related to new partnerships.',
      explanation: 'I conducted a thorough review of all legal documents related to new partnerships, ensuring compliance and mitigating risks.',
      assignee: 'Chris Parker',
    },
    {
      id: 49,
      title: 'Attendance',
      dueDate: dayjs().add(42, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(47, 'day').hour(8).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(41, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will ensure my presence at all critical project review meetings.',
      explanation: 'I ensured my presence at all critical project review meetings, providing timely updates and addressing concerns.',
      assignee: 'Riley Chen',
    },
    {
      id: 50,
      title: 'Promise Kept General',
      dueDate: dayjs().add(43, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(48, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(42, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will prepare a comprehensive report on our competitive landscape.',
      explanation: 'I prepared a comprehensive report on our competitive landscape, providing strategic insights for market positioning.',
      assignee: 'Jamie Smith',
    },
    {
      id: 51, // New overdue badge
      title: 'Attendance',
      dueDate: dayjs().subtract(2, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(3, 'day').hour(8).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(1, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will attend the mandatory security awareness training.',
      assignee: 'Alex Johnson',
      isOverdue: true, // Explicitly mark as overdue
      explanation: 'I attended the mandatory security awareness training and completed all required modules, enhancing my understanding of cybersecurity best practices.',
    },
  ];

  const myUnkeptPromisesItems = [
    {
      id: 9,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(20, 'day').hour(18).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(25, 'day').hour(9).minute(15).format('MMM D, YYYY, hh:mm A'),
      description: 'I promised to deliver the final report on the agreed-upon deadline, including all necessary data and analysis.',
      assignee: 'John Doe',
    },
    {
      id: 10,
      title: 'Attendance',
      dueDate: dayjs().subtract(15, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(18, 'day').hour(9).minute(15).format('MMM D, YYYY, hh:mm A'),
      description: 'I committed to attending the critical client call.',
      assignee: 'Jane Smith',
    },
    {
      id: 11,
      title: 'Teamwork',
      dueDate: dayjs().subtract(10, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(12, 'day').hour(9).minute(15).format('MMM D, YYYY, hh:mm A'),
      description: 'I was going to provide the necessary assets for the marketing campaign, ensuring they were high-quality and on brand.',
      assignee: 'Peter Jones',
    },
  ];

  // Filter active promises (not unkept, and not yet approved)
  const activePromisesItems = allMyPromisesSource.filter(item => 
    !item.approvedDate && !myUnkeptPromisesItems.some(unkept => unkept.id === item.id)
  ).slice(0, 6); // Keep only 6 active commitments

  // Filter completed promises (have an approvedDate)
  const myBadgesItems = allMyPromisesSource.filter(item => !!item.approvedDate);

  const myCommitmentsTabs = [
    {
      label: 'Active Promises',
      count: activePromisesItems.length,
      items: activePromisesItems,
    },
    {
      label: 'My Badges', // Renamed from 'My Promises'
      count: myBadgesItems.length,
      items: myBadgesItems,
    },
    {
      label: 'My Unkept Promises',
      count: myUnkeptPromisesItems.length,
      items: myUnkeptPromisesItems,
    },
  ];

  // --- Data for Others' Commitments ---
  const promisesOwedToMeItems = [
    {
      id: 1,
      title: 'Teamwork',
      dueDate: dayjs().add(2, 'day').hour(11).minute(45).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(5, 'day').hour(16).minute(20).format('MMM D, YYYY, hh:mm A'),
      description: 'I will provide feedback on the new product design mockups for client presentation, focusing on usability and aesthetic appeal.',
      assignee: 'Riley Chen',
      isOverdue: false,
    },
    {
      id: 2,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(1, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), // Make this one overdue
      committedDate: dayjs().subtract(7, 'day').hour(13).minute(5).format('MMM D, YYYY, hh:mm A'),
      description: 'I am going to deliver the quarterly marketing report with all KPIs and campaign results, highlighting key achievements and areas for improvement.',
      assignee: 'Jamie Smith',
      isOverdue: true,
    },
    {
      id: 3,
      title: 'Leadership',
      dueDate: dayjs().add(6, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(9, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will lead the weekly team sync meeting and ensure all action items are captured and assigned.',
      assignee: 'Sarah Connor',
      isOverdue: false,
    },
    {
      id: 4,
      title: 'Attendance',
      dueDate: dayjs().subtract(3, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'), // Make this one overdue
      committedDate: dayjs().subtract(11, 'day').hour(8).minute(30).format('MMM D, YYYY, hh:mm A'),
      description: 'I will attend the all-hands company meeting and provide a summary to my team.',
      assignee: 'Mike Miller',
      isOverdue: true,
    },
    {
      id: 5,
      title: 'Promise Kept General',
      dueDate: dayjs().add(10, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(13, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will finalize the client proposal and send it for review by end of day.',
      assignee: 'Chris Parker',
      isOverdue: false,
    },
    {
      id: 6,
      title: 'Teamwork',
      dueDate: dayjs().add(12, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(15, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will assist with the onboarding of the new junior developer, providing guidance and support.',
      assignee: 'Alex Johnson',
      isOverdue: false,
    },
  ];

  const dailyAnswers = [
    "Refactored the main database query for performance. Learned that indexing a specific column can have a massive impact.",
    "Completed the UI mockups for the new dashboard. The challenge was incorporating feedback from three different stakeholders, which taught me to consolidate feedback before starting.",
    "Wrote unit tests for the authentication module, achieving 95% coverage. I learned a new mocking technique for external services.",
    "Fixed a critical bug in the payment processing system. The lesson was to always validate user input on both the client and server sides.",
    "Deployed the latest build to the staging environment. Learned the importance of having a rollback plan, even for minor updates.",
    "Met with the product team to finalize requirements for the next sprint. Learned to ask more clarifying questions to avoid ambiguity.",
    "Updated the API documentation with the latest endpoints. The challenge was making it clear for non-technical users, improving my technical writing skills.",
    "Investigated a performance bottleneck in the image upload feature. Learned about the trade-offs between image quality and loading speed.",
    "Paired with a junior developer to help them with a complex task. It reinforced my own understanding of the codebase.",
    "Set up a new CI/CD pipeline for the microservice. The lesson was that initial setup takes time but saves hours in the long run.",
    "Analyzed user feedback from the last release. Learned that users often find creative ways to use features that we didn't anticipate.",
    "Created a proof-of-concept for the new real-time notification feature. The challenge was choosing the right WebSocket library.",
    "Participated in a code review for a teammate's feature. Learned a more efficient way to handle asynchronous operations in JavaScript.",
    "Wrote a script to automate the weekly report generation. The lesson is that a few hours of scripting can save many hours of manual work.",
    "Designed the database schema for the upcoming user profile section. Learned about the importance of normalization for data integrity.",
    "Researched third-party APIs for a new integration. The challenge was navigating sparse documentation from one of the providers.",
    "Sketched out the user flow for the password reset feature. Learned that visualizing the flow on paper first saves a lot of time in the design tool.",
    "Finalized the user authentication flow. The main challenge was dealing with legacy code, which taught me the importance of clear documentation."
  ];

  const badgesIssuedItems = [
    {
      id: 166,
      title: 'On Track (Daily)',
      dueDate: dayjs().subtract(1, 'month').format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(2, 'months').format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(1, 'month').add(1, 'day').format('MMM D, YYYY, hh:mm A'),
      description: 'I will provide a daily update on my progress towards the quarterly goals, ensuring transparency and accountability.',
      assignee: 'Riley Chen',
      type: 'nudge',
      responses: dailyAnswers.map((answer, i) => ({
        date: dayjs().subtract(1, 'month').subtract(i, 'days').format('MMM D, YYYY'),
        questions: [
          'What’s one thing you did today that moved you closer to your goal?',
          'What’s one lesson you learned from today’s challenges?'
        ],
        answer: answer
      }))
    },
    {
      id: 101,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(10, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(12, 'day').hour(9).minute(15).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(9, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will complete the mandatory HR compliance training course.',
      explanation: 'I have submitted the form and answered all the questions, ensuring full compliance with company policies and regulations.',
      assignee: 'Chris Parker',
    },
    {
      id: 102,
      title: 'Teamwork',
      dueDate: dayjs().subtract(8, 'day').hour(16).minute(30).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(10, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(7, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will collaborate with the design team on the new UI mockups.',
      explanation: 'We held a final review session and all stakeholders have signed off on the mockups, incorporating feedback from various departments.',
      assignee: 'Riley Chen',
    },
    {
      id: 103,
      title: 'Leadership',
      dueDate: dayjs().subtract(6, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(8, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(5, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will lead the weekly team sync meeting and ensure all action items are captured and assigned.',
      explanation: 'I led the meeting, and the minutes with action items have been circulated to all attendees for their reference and follow-up.',
      assignee: 'Sarah Wilson',
    },
    {
      id: 104,
      title: 'Attendance',
      dueDate: dayjs().subtract(4, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(6, 'day').hour(8).minute(30).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(3, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I commit to attending the full-day workshop on new project management tools.',
      explanation: 'I attended the entire workshop and have shared my notes with the team, highlighting key takeaways and potential applications for our projects.',
      assignee: 'Mike Johnson',
    },
    {
      id: 105,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(2, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(4, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(1, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I am going to update the shared documentation with the latest API specifications.',
      explanation: 'The documentation is now up-to-date on Confluence, and the link has been shared in the relevant communication channel for easy access.',
      assignee: 'Jamie Smith',
    },
    {
      id: 106,
      title: 'Teamwork',
      dueDate: dayjs().subtract(15, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(17, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(14, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will assist the new intern with setting up their development environment.',
      explanation: 'I spent two hours with the intern, and they are now fully set up and ready to start coding, having resolved all initial configuration issues.',
      assignee: 'Alex Johnson',
      isOverdue: true,
    },
    {
      id: 107,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(18, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(20, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(17, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will prepare the quarterly business review (QBR) presentation for all key stakeholders.',
      explanation: 'The QBR presentation is complete and has been shared with all stakeholders, covering key achievements and future strategies.',
      assignee: 'Sarah Connor',
    },
    {
      id: 108,
      title: 'Attendance',
      dueDate: dayjs().subtract(21, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(23, 'day').hour(8).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(20, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will attend the company-wide training session on new software tools.',
      explanation: 'I attended the full training session and gained valuable insights into the new software tools, which I will apply to my work.',
      assignee: 'Mike Miller',
    },
    {
      id: 109,
      title: 'Leadership',
      dueDate: dayjs().subtract(24, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(26, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(23, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will lead the brainstorming session for the next product feature.',
      explanation: 'The brainstorming session was successfully led, resulting in several innovative ideas for the next product feature, which are now being evaluated.',
      assignee: 'Chris Parker',
    },
    {
      id: 110,
      title: 'Teamwork',
      dueDate: dayjs().subtract(27, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(29, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(26, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will collaborate with the sales team to develop new client proposals.',
      explanation: 'I collaborated with the sales team to create compelling new client proposals, which are now ready for presentation.',
      assignee: 'Riley Chen',
    },
    {
      id: 111,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(30, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(32, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(29, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will prepare a detailed report on customer feedback and suggestions.',
      explanation: 'The customer feedback report is complete, providing actionable insights for product improvements and customer satisfaction.',
      assignee: 'Jamie Smith',
    },
    {
      id: 112,
      title: 'Attendance',
      dueDate: dayjs().subtract(33, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(35, 'day').hour(8).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(32, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will ensure timely attendance at all scheduled client meetings.',
      explanation: 'I attended all scheduled client meetings on time, ensuring smooth communication and progress on projects.',
      assignee: 'Alex Johnson',
    },
    {
      id: 113,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(36, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(38, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(35, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will conduct a training session for new employees on our internal tools.',
      explanation: 'The training session for new employees was successfully conducted, covering all essential internal tools and workflows.',
      assignee: 'Sarah Connor',
    },
    {
      id: 114,
      title: 'Teamwork',
      dueDate: dayjs().subtract(39, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(41, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(38, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will assist in organizing the company\'s annual team-building event.',
      explanation: 'I actively assisted in organizing the annual team-building event, contributing to its successful execution and positive feedback.',
      assignee: 'Mike Miller',
    },
    {
      id: 115,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(42, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(44, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(41, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will develop and implement a new feature for the mobile application.',
      explanation: 'The new mobile application feature has been successfully developed and implemented, meeting all specified requirements and improving user experience.',
      assignee: 'Chris Parker',
    },
    {
      id: 116,
      title: 'Attendance',
      dueDate: dayjs().subtract(45, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(47, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(44, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will attend the industry conference to gather insights on emerging trends.',
      explanation: 'I attended the industry conference and gathered valuable insights into emerging trends, which I will share with the team for strategic planning.',
      assignee: 'Riley Chen',
      isOverdue: true,
    },
    {
      id: 117,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(48, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(50, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(47, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will prepare a detailed financial forecast for the next fiscal year.',
      explanation: 'The detailed financial forecast for the next fiscal year is complete, providing a clear outlook for budgeting and resource allocation.',
      assignee: 'Jamie Smith',
    },
    {
      id: 118,
      title: 'Teamwork',
      dueDate: dayjs().subtract(51, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(53, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(50, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will collaborate with cross-functional teams to streamline our workflow.',
      explanation: 'I successfully collaborated with cross-functional teams, resulting in a streamlined workflow that improved efficiency and reduced bottlenecks.',
      assignee: 'Alex Johnson',
    },
    {
      id: 119,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(54, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(56, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(53, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will conduct a thorough market analysis for our new product launch.',
      explanation: 'The comprehensive market analysis for the new product launch is complete, providing key insights into market trends and competitive landscape.',
      assignee: 'Sarah Connor',
    },
    {
      id: 120,
      title: 'Attendance',
      dueDate: dayjs().subtract(57, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(59, 'day').hour(8).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(56, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will ensure my presence at all mandatory company-wide meetings.',
      explanation: 'I attended all mandatory company-wide meetings, staying informed and contributing to important discussions.',
      assignee: 'Mike Miller',
    },
    {
      id: 121,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(60, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(62, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(59, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will design and implement a new database schema for improved performance.',
      explanation: 'Designed and implemented a new database schema, resulting in a 15% improvement in query performance and data retrieval efficiency.',
      assignee: 'Chris Parker',
    },
    {
      id: 122,
      title: 'Teamwork',
      dueDate: dayjs().subtract(63, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(65, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(62, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will provide support to colleagues facing technical challenges.',
      explanation: 'Provided technical support to colleagues, resolving 10 complex issues and ensuring smooth project progression.',
      assignee: 'Riley Chen',
    },
    {
      id: 123,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(66, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(68, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(65, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will prepare a detailed report on the effectiveness of our recent marketing campaigns.',
      explanation: 'Prepared a detailed report on recent marketing campaigns, highlighting key successes and areas for optimization.',
      assignee: 'Jamie Smith',
    },
    {
      id: 124,
      title: 'Attendance',
      dueDate: dayjs().subtract(69, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(71, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(68, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will attend all scheduled client presentations and contribute to discussions.',
      explanation: 'Attended all scheduled client presentations, actively contributing to discussions and addressing client concerns effectively.',
      assignee: 'Alex Johnson',
    },
    {
      id: 125,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(72, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(74, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(71, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will develop and deploy a new microservice to enhance system scalability.',
      explanation: 'Developed and deployed a new microservice, improving system scalability by 20% and reducing latency.',
      assignee: 'Sarah Connor',
    },
    { id: 126, title: 'Teamwork', dueDate: dayjs().subtract(75, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(77, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(74, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will mentor the new intern on best coding practices.', explanation: 'Mentored the new intern for 3 weeks, covering Git, code reviews, and project structure. They are now contributing independently.', assignee: 'Mike Miller', isOverdue: true, },
    { id: 127, title: 'Promise Kept General', dueDate: dayjs().subtract(78, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(80, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(77, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will prepare a detailed report on the Q1 financial performance.', explanation: 'Submitted the Q1 financial report, including revenue, expenses, and profit margins. Presented findings to the board.', assignee: 'Chris Parker' },
    { id: 128, title: 'Attendance', dueDate: dayjs().subtract(81, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(83, 'day').hour(8).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(80, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will attend the weekly marketing sync meeting.', explanation: 'Attended all weekly marketing syncs for Q1, actively participating in strategy discussions and task assignments.', assignee: 'Riley Chen' },
    { id: 129, title: 'Promise Kept General', dueDate: dayjs().subtract(84, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(86, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(83, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will update the company website with new product features.', explanation: 'Successfully updated the company website with the latest product features, including new images and descriptions. Verified functionality across browsers.', assignee: 'Jamie Smith' },
    { id: 130, title: 'Teamwork', dueDate: dayjs().subtract(87, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(89, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(86, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will assist the HR team with new employee onboarding.', explanation: 'Assisted HR with onboarding 5 new employees, preparing welcome kits and conducting initial orientation sessions.', assignee: 'Alex Johnson' },
    { id: 131, title: 'Promise Kept General', dueDate: dayjs().subtract(90, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(92, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(89, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will conduct a security audit of the new payment gateway.', explanation: 'Completed a comprehensive security audit of the new payment gateway, identifying and resolving 3 critical vulnerabilities.', assignee: 'Sarah Connor' },
    { id: 132, title: 'Attendance', dueDate: dayjs().subtract(93, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(95, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(92, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will attend the annual company retreat.', explanation: 'Attended the annual company retreat, participated in all team-building activities, and contributed to strategic planning sessions.', assignee: 'Mike Miller' },
    { id: 133, title: 'Promise Kept General', dueDate: dayjs().subtract(96, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(98, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(95, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will develop a new feature for the internal dashboard.', explanation: 'Developed and deployed the new analytics feature for the internal dashboard, improving data visualization for managers.', assignee: 'Chris Parker' },
    { id: 134, title: 'Teamwork', dueDate: dayjs().subtract(99, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(101, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(98, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will collaborate with the product team on user feedback analysis.', explanation: 'Collaborated with the product team to analyze 500+ user feedback submissions, identifying key areas for product improvement.', assignee: 'Riley Chen' },
    { id: 135, title: 'Promise Kept General', dueDate: dayjs().subtract(102, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(104, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(101, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will prepare a comprehensive report on market trends for Q2.', explanation: 'Prepared a comprehensive report on Q2 market trends, including competitor analysis and emerging opportunities. Presented to leadership.', assignee: 'Jamie Smith' },
    { id: 136, title: 'Attendance', dueDate: dayjs().subtract(105, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(107, 'day').hour(8).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(104, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will ensure timely attendance at all daily stand-up meetings.', explanation: 'Maintained 100% attendance at daily stand-up meetings throughout the quarter, providing consistent updates and support.', assignee: 'Alex Johnson', isOverdue: true, },
    { id: 137, title: 'Promise Kept General', dueDate: dayjs().subtract(108, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(110, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(107, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will conduct a training session on new software for the sales team.', explanation: 'Conducted a successful training session for the sales team on the new CRM software, leading to a 20% increase in adoption.', assignee: 'Sarah Connor' },
    { id: 138, title: 'Teamwork', dueDate: dayjs().subtract(111, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(113, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(110, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will assist in resolving critical customer support tickets.', explanation: 'Assisted the support team in resolving 15 critical customer tickets within 24 hours, improving customer satisfaction scores.', assignee: 'Mike Miller' },
    { id: 139, title: 'Promise Kept General', dueDate: dayjs().subtract(114, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(116, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(113, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will optimize the database queries for improved application performance.', explanation: 'Optimized 5 key database queries, resulting in a 30% reduction in load times for critical application features.', assignee: 'Chris Parker' },
    { id: 140, title: 'Attendance', dueDate: dayjs().subtract(117, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(119, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(116, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will attend the weekly project review meetings.', explanation: 'Attended all weekly project review meetings, providing timely updates on task progress and identifying potential roadblocks.', assignee: 'Riley Chen' },
    { id: 141, title: 'Promise Kept General', dueDate: dayjs().subtract(120, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(122, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(119, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will prepare a detailed analysis of user engagement metrics.', explanation: 'Prepared a detailed analysis of user engagement metrics for the past quarter, providing actionable insights for product development.', assignee: 'Jamie Smith' },
    { id: 142, title: 'Teamwork', dueDate: dayjs().subtract(123, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(125, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(122, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will collaborate with the design team to finalize UI/UX mockups.', explanation: 'Collaborated closely with the design team to finalize UI/UX mockups for the upcoming release, ensuring a seamless user experience.', assignee: 'Alex Johnson' },
    { id: 143, title: 'Promise Kept General', dueDate: dayjs().subtract(126, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(128, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(125, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will conduct a competitive analysis for our new service offering.', explanation: 'Conducted a thorough competitive analysis for the new service offering, identifying key differentiators and market opportunities.', assignee: 'Sarah Connor' },
    { id: 144, title: 'Attendance', dueDate: dayjs().subtract(129, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(131, 'day').hour(8).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(128, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will ensure my presence at all team-building events.', explanation: 'Attended all team-building events, fostering a positive team environment and strengthening inter-departmental relationships.', assignee: 'Mike Miller' },
    { id: 145, title: 'Promise Kept General', dueDate: dayjs().subtract(132, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(134, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(131, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will develop and implement a new API for third-party integrations.', explanation: 'Developed and implemented a new API for third-party integrations, expanding our platform\'s capabilities and partner ecosystem.', assignee: 'Chris Parker' },
    { id: 146, title: 'Teamwork', dueDate: dayjs().subtract(135, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(137, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(134, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will assist in preparing the quarterly financial reports.', explanation: 'Assisted in preparing the quarterly financial reports, ensuring accuracy and timely submission to management.', assignee: 'Riley Chen' },
    { id: 147, title: 'Promise Kept General', dueDate: dayjs().subtract(138, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(140, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(137, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will conduct a thorough review of all project documentation.', explanation: 'Conducted a thorough review of all project documentation, identifying inconsistencies and ensuring compliance with standards.', assignee: 'Jamie Smith' },
    { id: 148, title: 'Attendance', dueDate: dayjs().subtract(141, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(143, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(140, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will attend the weekly team stand-up meetings.', explanation: 'Attended all weekly team stand-up meetings, providing updates and collaborating on solutions to challenges.', assignee: 'Alex Johnson' },
    { id: 149, title: 'Promise Kept General', dueDate: dayjs().subtract(144, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(146, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(143, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will develop and implement a new feature for the internal CRM system.', explanation: 'Developed and implemented a new feature for the internal CRM system, improving data management and user efficiency.', assignee: 'Sarah Connor' },
    { id: 150, title: 'Teamwork', dueDate: dayjs().subtract(147, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(149, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(146, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will actively participate in cross-functional team meetings.', explanation: 'Actively participated in cross-functional team meetings, contributing insights and fostering collaboration across departments.', assignee: 'Mike Miller' },
    { id: 151, title: 'Promise Kept General', dueDate: dayjs().subtract(150, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(152, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(149, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will prepare a comprehensive report on customer satisfaction metrics.', explanation: 'Prepared a comprehensive report on customer satisfaction metrics, identifying key trends and areas for improvement.', assignee: 'Chris Parker' },
    { id: 152, title: 'Attendance', dueDate: dayjs().subtract(153, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(155, 'day').hour(8).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(152, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will ensure my presence at all client onboarding sessions.', explanation: 'Ensured my presence at all client onboarding sessions, providing support and ensuring a smooth transition for new clients.', assignee: 'Riley Chen' },
    { id: 153, title: 'Promise Kept General', dueDate: dayjs().subtract(156, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(158, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(155, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will develop and implement a new data visualization dashboard.', explanation: 'Developed and implemented a new data visualization dashboard, providing real-time insights into key business metrics.', assignee: 'Jamie Smith' },
    { id: 154, title: 'Teamwork', dueDate: dayjs().subtract(159, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(161, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(158, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will assist in organizing the company\'s quarterly review meeting.', explanation: 'Assisted in organizing the company\'s quarterly review meeting, ensuring all logistics were handled efficiently.', assignee: 'Alex Johnson' },
    {
      id: 155, title: 'Promise Kept General', dueDate: dayjs().subtract(162, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(164, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(161, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will conduct a thorough analysis of our current cybersecurity measures.', explanation: 'Conducted a thorough analysis of our current cybersecurity measures, identifying vulnerabilities and recommending improvements.', assignee: 'Sarah Connor' },
    { id: 156, title: 'Attendance', dueDate: dayjs().subtract(165, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(167, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(164, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will attend all mandatory compliance training sessions.', explanation: 'Attended all mandatory compliance training sessions, ensuring full adherence to regulatory requirements.', assignee: 'Mike Miller', isOverdue: true, },
    { id: 157, title: 'Promise Kept General', dueDate: dayjs().subtract(168, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(170, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(167, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will prepare a detailed report on employee engagement survey results.', explanation: 'Prepared a detailed report on employee engagement survey results, providing insights for improving workplace satisfaction.', assignee: 'Chris Parker' },
    { id: 158, title: 'Teamwork', dueDate: dayjs().subtract(171, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(173, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(170, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will collaborate with the marketing team on new campaign strategies.', explanation: 'Collaborated with the marketing team to develop new campaign strategies, resulting in increased brand visibility.', assignee: 'Riley Chen' },
    { id: 159, title: 'Promise Kept General', dueDate: dayjs().subtract(174, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(176, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(173, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will develop and implement a new automated testing framework.', explanation: 'Developed and implemented a new automated testing framework, significantly reducing manual testing efforts and improving software quality.', assignee: 'Jamie Smith' },
    { id: 160, title: 'Attendance', dueDate: dayjs().subtract(177, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(179, 'day').hour(8).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(176, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will ensure my presence at all investor relations meetings.', explanation: 'Ensured my presence at all investor relations meetings, providing clear and concise updates on company performance.', assignee: 'Alex Johnson' },
    { id: 161, title: 'Promise Kept General', dueDate: dayjs().subtract(180, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(182, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(179, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will conduct a thorough review of all vendor contracts.', explanation: 'Conducted a thorough review of all vendor contracts, identifying cost-saving opportunities and ensuring favorable terms.', assignee: 'Sarah Connor' },
    { id: 162, title: 'Teamwork', dueDate: dayjs().subtract(183, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(185, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(182, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will assist in preparing the annual company budget.', explanation: 'Assisted in preparing the annual company budget, ensuring accurate financial projections and resource allocation.', assignee: 'Mike Miller' },
    { id: 163, title: 'Promise Kept General', dueDate: dayjs().subtract(186, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(188, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(185, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will optimize the cloud infrastructure for cost efficiency.', explanation: 'Optimized the cloud infrastructure, resulting in a 25% reduction in operational costs while maintaining performance.', assignee: 'Chris Parker' },
    { id: 164, title: 'Attendance', dueDate: dayjs().subtract(189, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(191, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(188, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will attend all product roadmap planning sessions.', explanation: 'Attended all product roadmap planning sessions, contributing to strategic decisions and aligning development efforts.', assignee: 'Riley Chen' },
    { id: 165, title: 'Promise Kept General', dueDate: dayjs().subtract(192, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(194, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(191, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will prepare a detailed report on competitor analysis for the new market.', explanation: 'Prepared a detailed report on competitor analysis for the new market, identifying key players and their strategies.', assignee: 'Jamie Smith' },
  ];

  const myUnkeptPromisesItems = [
    {
      id: 9,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(20, 'day').hour(18).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(25, 'day').hour(9).minute(15).format('MMM D, YYYY, hh:mm A'),
      description: 'I promised to deliver the final report on the agreed-upon deadline, including all necessary data and analysis.',
      assignee: 'John Doe',
    },
    {
      id: 10,
      title: 'Attendance',
      dueDate: dayjs().subtract(15, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(18, 'day').hour(9).minute(15).format('MMM D, YYYY, hh:mm A'),
      description: 'I committed to attending the critical client call.',
      assignee: 'Jane Smith',
    },
    {
      id: 11,
      title: 'Teamwork',
      dueDate: dayjs().subtract(10, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(12, 'day').hour(9).minute(15).format('MMM D, YYYY, hh:mm A'),
      description: 'I was going to provide the necessary assets for the marketing campaign, ensuring they were high-quality and on brand.',
      assignee: 'Peter Jones',
    },
  ];

  // Filter active promises (not unkept, and not yet approved)
  const activePromisesItems = allMyPromisesSource.filter(item => 
    !item.approvedDate && !myUnkeptPromisesItems.some(unkept => unkept.id === item.id)
  ).slice(0, 6); // Keep only 6 active commitments

  // Filter completed promises (have an approvedDate)
  const myBadgesItems = allMyPromisesSource.filter(item => !!item.approvedDate);

  const myCommitmentsTabs = [
    {
      label: 'Active Promises',
      count: activePromisesItems.length,
      items: activePromisesItems,
    },
    {
      label: 'My Badges', // Renamed from 'My Promises'
      count: myBadgesItems.length,
      items: myBadgesItems,
    },
    {
      label: 'My Unkept Promises',
      count: myUnkeptPromisesItems.length,
      items: myUnkeptPromisesItems,
    },
  ];

  // --- Data for Others' Commitments ---
  const promisesOwedToMeItems = [
    {
      id: 1,
      title: 'Teamwork',
      dueDate: dayjs().add(2, 'day').hour(11).minute(45).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(5, 'day').hour(16).minute(20).format('MMM D, YYYY, hh:mm A'),
      description: 'I will provide feedback on the new product design mockups for client presentation, focusing on usability and aesthetic appeal.',
      assignee: 'Riley Chen',
      isOverdue: false,
    },
    {
      id: 2,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(1, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), // Make this one overdue
      committedDate: dayjs().subtract(7, 'day').hour(13).minute(5).format('MMM D, YYYY, hh:mm A'),
      description: 'I am going to deliver the quarterly marketing report with all KPIs and campaign results, highlighting key achievements and areas for improvement.',
      assignee: 'Jamie Smith',
      isOverdue: true,
    },
    {
      id: 3,
      title: 'Leadership',
      dueDate: dayjs().add(6, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(9, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will lead the weekly team sync meeting and ensure all action items are captured and assigned.',
      assignee: 'Sarah Connor',
      isOverdue: false,
    },
    {
      id: 4,
      title: 'Attendance',
      dueDate: dayjs().subtract(3, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'), // Make this one overdue
      committedDate: dayjs().subtract(11, 'day').hour(8).minute(30).format('MMM D, YYYY, hh:mm A'),
      description: 'I will attend the all-hands company meeting and provide a summary to my team.',
      assignee: 'Mike Miller',
      isOverdue: true,
    },
    {
      id: 5,
      title: 'Promise Kept General',
      dueDate: dayjs().add(10, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(13, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will finalize the client proposal and send it for review by end of day.',
      assignee: 'Chris Parker',
      isOverdue: false,
    },
    {
      id: 6,
      title: 'Teamwork',
      dueDate: dayjs().add(12, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(15, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will assist with the onboarding of the new junior developer, providing guidance and support.',
      assignee: 'Alex Johnson',
      isOverdue: false,
    },
  ];

  const dailyAnswers = [
    "Refactored the main database query for performance. Learned that indexing a specific column can have a massive impact.",
    "Completed the UI mockups for the new dashboard. The challenge was incorporating feedback from three different stakeholders, which taught me to consolidate feedback before starting.",
    "Wrote unit tests for the authentication module, achieving 95% coverage. I learned a new mocking technique for external services.",
    "Fixed a critical bug in the payment processing system. The lesson was to always validate user input on both the client and server sides.",
    "Deployed the latest build to the staging environment. Learned the importance of having a rollback plan, even for minor updates.",
    "Met with the product team to finalize requirements for the next sprint. Learned to ask more clarifying questions to avoid ambiguity.",
    "Updated the API documentation with the latest endpoints. The challenge was making it clear for non-technical users, improving my technical writing skills.",
    "Investigated a performance bottleneck in the image upload feature. Learned about the trade-offs between image quality and loading speed.",
    "Paired with a junior developer to help them with a complex task. It reinforced my own understanding of the codebase.",
    "Set up a new CI/CD pipeline for the microservice. The lesson was that initial setup takes time but saves hours in the long run.",
    "Analyzed user feedback from the last release. Learned that users often find creative ways to use features that we didn't anticipate.",
    "Created a proof-of-concept for the new real-time notification feature. The challenge was choosing the right WebSocket library.",
    "Participated in a code review for a teammate's feature. Learned a more efficient way to handle asynchronous operations in JavaScript.",
    "Wrote a script to automate the weekly report generation. The lesson is that a few hours of scripting can save many hours of manual work.",
    "Designed the database schema for the upcoming user profile section. Learned about the importance of normalization for data integrity.",
    "Researched third-party APIs for a new integration. The challenge was navigating sparse documentation from one of the providers.",
    "Sketched out the user flow for the password reset feature. Learned that visualizing the flow on paper first saves a lot of time in the design tool.",
    "Finalized the user authentication flow. The main challenge was dealing with legacy code, which taught me the importance of clear documentation."
  ];

  const badgesIssuedItems = [
    {
      id: 166,
      title: 'On Track (Daily)',
      dueDate: dayjs().subtract(1, 'month').format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(2, 'months').format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(1, 'month').add(1, 'day').format('MMM D, YYYY, hh:mm A'),
      description: 'I will provide a daily update on my progress towards the quarterly goals, ensuring transparency and accountability.',
      assignee: 'Riley Chen',
      type: 'nudge',
      responses: dailyAnswers.map((answer, i) => ({
        date: dayjs().subtract(1, 'month').subtract(i, 'days').format('MMM D, YYYY'),
        questions: [
          'What’s one thing you did today that moved you closer to your goal?',
          'What’s one lesson you learned from today’s challenges?'
        ],
        answer: answer
      }))
    },
    {
      id: 101,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(10, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(12, 'day').hour(9).minute(15).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(9, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will complete the mandatory HR compliance training course.',
      explanation: 'I have submitted the form and answered all the questions, ensuring full compliance with company policies and regulations.',
      assignee: 'Chris Parker',
    },
    {
      id: 102,
      title: 'Teamwork',
      dueDate: dayjs().subtract(8, 'day').hour(16).minute(30).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(10, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(7, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will collaborate with the design team on the new UI mockups.',
      explanation: 'We held a final review session and all stakeholders have signed off on the mockups, incorporating feedback from various departments.',
      assignee: 'Riley Chen',
    },
    {
      id: 103,
      title: 'Leadership',
      dueDate: dayjs().subtract(6, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(8, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(5, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will lead the weekly team sync meeting and ensure all action items are captured and assigned.',
      explanation: 'I led the meeting, and the minutes with action items have been circulated to all attendees for their reference and follow-up.',
      assignee: 'Sarah Wilson',
    },
    {
      id: 104,
      title: 'Attendance',
      dueDate: dayjs().subtract(4, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(6, 'day').hour(8).minute(30).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(3, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I commit to attending the full-day workshop on new project management tools.',
      explanation: 'I attended the entire workshop and have shared my notes with the team, highlighting key takeaways and potential applications for our projects.',
      assignee: 'Mike Johnson',
    },
    {
      id: 105,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(2, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(4, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(1, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I am going to update the shared documentation with the latest API specifications.',
      explanation: 'The documentation is now up-to-date on Confluence, and the link has been shared in the relevant communication channel for easy access.',
      assignee: 'Jamie Smith',
    },
    {
      id: 106,
      title: 'Teamwork',
      dueDate: dayjs().subtract(15, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(17, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(14, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will assist the new intern with setting up their development environment.',
      explanation: 'I spent two hours with the intern, and they are now fully set up and ready to start coding, having resolved all initial configuration issues.',
      assignee: 'Alex Johnson',
      isOverdue: true,
    },
    {
      id: 107,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(18, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(20, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(17, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will prepare the quarterly business review (QBR) presentation for all key stakeholders.',
      explanation: 'The QBR presentation is complete and has been shared with all stakeholders, covering key achievements and future strategies.',
      assignee: 'Sarah Connor',
    },
    {
      id: 108,
      title: 'Attendance',
      dueDate: dayjs().subtract(21, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(23, 'day').hour(8).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(20, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will attend the company-wide training session on new software tools.',
      explanation: 'I attended the full training session and gained valuable insights into the new software tools, which I will apply to my work.',
      assignee: 'Mike Miller',
    },
    {
      id: 109,
      title: 'Leadership',
      dueDate: dayjs().subtract(24, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(26, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(23, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will lead the brainstorming session for the next product feature.',
      explanation: 'The brainstorming session was successfully led, resulting in several innovative ideas for the next product feature, which are now being evaluated.',
      assignee: 'Chris Parker',
    },
    {
      id: 110,
      title: 'Teamwork',
      dueDate: dayjs().subtract(27, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(29, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(26, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will collaborate with the sales team to develop new client proposals.',
      explanation: 'I collaborated with the sales team to create compelling new client proposals, which are now ready for presentation.',
      assignee: 'Riley Chen',
    },
    {
      id: 111,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(30, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(32, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(29, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will prepare a detailed report on customer feedback and suggestions.',
      explanation: 'The customer feedback report is complete, providing actionable insights for product improvements and customer satisfaction.',
      assignee: 'Jamie Smith',
    },
    {
      id: 112,
      title: 'Attendance',
      dueDate: dayjs().subtract(33, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(35, 'day').hour(8).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(32, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will ensure timely attendance at all scheduled client meetings.',
      explanation: 'I attended all scheduled client meetings on time, ensuring smooth communication and progress on projects.',
      assignee: 'Alex Johnson',
    },
    {
      id: 113,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(36, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(38, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(35, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will conduct a training session for new employees on our internal tools.',
      explanation: 'The training session for new employees was successfully conducted, covering all essential internal tools and workflows.',
      assignee: 'Sarah Connor',
    },
    {
      id: 114,
      title: 'Teamwork',
      dueDate: dayjs().subtract(39, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(41, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(38, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will assist in organizing the company\'s annual team-building event.',
      explanation: 'I actively assisted in organizing the annual team-building event, contributing to its successful execution and positive feedback.',
      assignee: 'Mike Miller',
    },
    {
      id: 115,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(42, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(44, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(41, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will develop and implement a new feature for the mobile application.',
      explanation: 'The new mobile application feature has been successfully developed and implemented, meeting all specified requirements and improving user experience.',
      assignee: 'Chris Parker',
    },
    {
      id: 116,
      title: 'Attendance',
      dueDate: dayjs().subtract(45, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(47, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(44, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will attend the industry conference to gather insights on emerging trends.',
      explanation: 'I attended the industry conference and gathered valuable insights into emerging trends, which I will share with the team for strategic planning.',
      assignee: 'Riley Chen',
      isOverdue: true,
    },
    {
      id: 117,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(48, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(50, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(47, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will prepare a detailed financial forecast for the next fiscal year.',
      explanation: 'The detailed financial forecast for the next fiscal year is complete, providing a clear outlook for budgeting and resource allocation.',
      assignee: 'Jamie Smith',
    },
    {
      id: 118,
      title: 'Teamwork',
      dueDate: dayjs().subtract(51, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(53, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(50, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will collaborate with cross-functional teams to streamline our workflow.',
      explanation: 'I successfully collaborated with cross-functional teams, resulting in a streamlined workflow that improved efficiency and reduced bottlenecks.',
      assignee: 'Alex Johnson',
    },
    {
      id: 119,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(54, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(56, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(53, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will conduct a thorough market analysis for our new product launch.',
      explanation: 'The comprehensive market analysis for the new product launch is complete, providing key insights into market trends and competitive landscape.',
      assignee: 'Sarah Connor',
    },
    {
      id: 120,
      title: 'Attendance',
      dueDate: dayjs().subtract(57, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(59, 'day').hour(8).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(56, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will ensure my presence at all mandatory company-wide meetings.',
      explanation: 'I attended all mandatory company-wide meetings, staying informed and contributing to important discussions.',
      assignee: 'Mike Miller',
    },
    {
      id: 121,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(60, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(62, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(59, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will design and implement a new database schema for improved performance.',
      explanation: 'Designed and implemented a new database schema, resulting in a 15% improvement in query performance and data retrieval efficiency.',
      assignee: 'Chris Parker',
    },
    {
      id: 122,
      title: 'Teamwork',
      dueDate: dayjs().subtract(63, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(65, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(62, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will provide support to colleagues facing technical challenges.',
      explanation: 'Provided technical support to colleagues, resolving 10 complex issues and ensuring smooth project progression.',
      assignee: 'Riley Chen',
    },
    {
      id: 123,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(66, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(68, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(65, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will prepare a detailed report on the effectiveness of our recent marketing campaigns.',
      explanation: 'Prepared a detailed report on recent marketing campaigns, highlighting key successes and areas for optimization.',
      assignee: 'Jamie Smith',
    },
    {
      id: 124,
      title: 'Attendance',
      dueDate: dayjs().subtract(69, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(71, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(68, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will attend all scheduled client presentations and contribute to discussions.',
      explanation: 'Attended all scheduled client presentations, actively contributing to discussions and addressing client concerns effectively.',
      assignee: 'Alex Johnson',
    },
    {
      id: 125,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(72, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(74, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(71, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will develop and deploy a new microservice to enhance system scalability.',
      explanation: 'Developed and deployed a new microservice, improving system scalability by 20% and reducing latency.',
      assignee: 'Sarah Connor',
    },
    { id: 126, title: 'Teamwork', dueDate: dayjs().subtract(75, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(77, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(74, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will mentor the new intern on best coding practices.', explanation: 'Mentored the new intern for 3 weeks, covering Git, code reviews, and project structure. They are now contributing independently.', assignee: 'Mike Miller', isOverdue: true, },
    { id: 127, title: 'Promise Kept General', dueDate: dayjs().subtract(78, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(80, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(77, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will prepare a detailed report on the Q1 financial performance.', explanation: 'Submitted the Q1 financial report, including revenue, expenses, and profit margins. Presented findings to the board.', assignee: 'Chris Parker' },
    { id: 128, title: 'Attendance', dueDate: dayjs().subtract(81, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(83, 'day').hour(8).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(80, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will attend the weekly marketing sync meeting.', explanation: 'Attended all weekly marketing syncs for Q1, actively participating in strategy discussions and task assignments.', assignee: 'Riley Chen' },
    { id: 129, title: 'Promise Kept General', dueDate: dayjs().subtract(84, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(86, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(83, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will update the company website with new product features.', explanation: 'Successfully updated the company website with the latest product features, including new images and descriptions. Verified functionality across browsers.', assignee: 'Jamie Smith' },
    { id: 130, title: 'Teamwork', dueDate: dayjs().subtract(87, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(89, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(86, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will assist the HR team with new employee onboarding.', explanation: 'Assisted HR with onboarding 5 new employees, preparing welcome kits and conducting initial orientation sessions.', assignee: 'Alex Johnson' },
    { id: 131, title: 'Promise Kept General', dueDate: dayjs().subtract(90, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(92, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(89, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will conduct a security audit of the new payment gateway.', explanation: 'Completed a comprehensive security audit of the new payment gateway, identifying and resolving 3 critical vulnerabilities.', assignee: 'Sarah Connor' },
    { id: 132, title: 'Attendance', dueDate: dayjs().subtract(93, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(95, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(92, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will attend the annual company retreat.', explanation: 'Attended the annual company retreat, participated in all team-building activities, and contributed to strategic planning sessions.', assignee: 'Mike Miller' },
    { id: 133, title: 'Promise Kept General', dueDate: dayjs().subtract(96, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(98, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(95, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will develop a new feature for the internal dashboard.', explanation: 'Developed and deployed the new analytics feature for the internal dashboard, improving data visualization for managers.', assignee: 'Chris Parker' },
    { id: 134, title: 'Teamwork', dueDate: dayjs().subtract(99, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(101, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(98, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will collaborate with the product team on user feedback analysis.', explanation: 'Collaborated with the product team to analyze 500+ user feedback submissions, identifying key areas for product improvement.', assignee: 'Riley Chen' },
    { id: 135, title: 'Promise Kept General', dueDate: dayjs().subtract(102, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(104, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(101, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will prepare a comprehensive report on market trends for Q2.', explanation: 'Prepared a comprehensive report on Q2 market trends, including competitor analysis and emerging opportunities. Presented to leadership.', assignee: 'Jamie Smith' },
    { id: 136, title: 'Attendance', dueDate: dayjs().subtract(105, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(107, 'day').hour(8).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(104, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will ensure timely attendance at all daily stand-up meetings.', explanation: 'Maintained 100% attendance at daily stand-up meetings throughout the quarter, providing consistent updates and support.', assignee: 'Alex Johnson', isOverdue: true, },
    { id: 137, title: 'Promise Kept General', dueDate: dayjs().subtract(108, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(110, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(107, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will conduct a training session on new software for the sales team.', explanation: 'Conducted a successful training session for the sales team on the new CRM software, leading to a 20% increase in adoption.', assignee: 'Sarah Connor' },
    { id: 138, title: 'Teamwork', dueDate: dayjs().subtract(111, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(113, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(110, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will assist in resolving critical customer support tickets.', explanation: 'Assisted the support team in resolving 15 critical customer tickets within 24 hours, improving customer satisfaction scores.', assignee: 'Mike Miller' },
    { id: 139, title: 'Promise Kept General', dueDate: dayjs().subtract(114, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(116, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(113, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will optimize the database queries for improved application performance.', explanation: 'Optimized 5 key database queries, resulting in a 30% reduction in load times for critical application features.', assignee: 'Chris Parker' },
    { id: 140, title: 'Attendance', dueDate: dayjs().subtract(117, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(119, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(116, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will attend the weekly project review meetings.', explanation: 'Attended all weekly project review meetings, providing timely updates on task progress and identifying potential roadblocks.', assignee: 'Riley Chen' },
    { id: 141, title: 'Promise Kept General', dueDate: dayjs().subtract(120, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(122, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(119, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will prepare a detailed analysis of user engagement metrics.', explanation: 'Prepared a detailed analysis of user engagement metrics for the past quarter, providing actionable insights for product development.', assignee: 'Jamie Smith' },
    { id: 142, title: 'Teamwork', dueDate: dayjs().subtract(123, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(125, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(122, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will collaborate with the design team to finalize UI/UX mockups.', explanation: 'Collaborated closely with the design team to finalize UI/UX mockups for the upcoming release, ensuring a seamless user experience.', assignee: 'Alex Johnson' },
    { id: 143, title: 'Promise Kept General', dueDate: dayjs().subtract(126, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(128, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(125, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will conduct a competitive analysis for our new service offering.', explanation: 'Conducted a thorough competitive analysis for the new service offering, identifying key differentiators and market opportunities.', assignee: 'Sarah Connor' },
    { id: 144, title: 'Attendance', dueDate: dayjs().subtract(129, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(131, 'day').hour(8).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(128, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will ensure my presence at all team-building events.', explanation: 'Attended all team-building events, fostering a positive team environment and strengthening inter-departmental relationships.', assignee: 'Mike Miller' },
    { id: 145, title: 'Promise Kept General', dueDate: dayjs().subtract(132, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(134, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(131, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will develop and implement a new API for third-party integrations.', explanation: 'Developed and implemented a new API for third-party integrations, expanding our platform\'s capabilities and partner ecosystem.', assignee: 'Chris Parker' },
    { id: 146, title: 'Teamwork', dueDate: dayjs().subtract(135, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(137, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(134, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will assist in preparing the quarterly financial reports.', explanation: 'Assisted in preparing the quarterly financial reports, ensuring accuracy and timely submission to management.', assignee: 'Riley Chen' },
    { id: 147, title: 'Promise Kept General', dueDate: dayjs().subtract(138, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(140, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(137, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will conduct a thorough review of all project documentation.', explanation: 'Conducted a thorough review of all project documentation, identifying inconsistencies and ensuring compliance with standards.', assignee: 'Jamie Smith' },
    { id: 148, title: 'Attendance', dueDate: dayjs().subtract(141, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(143, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(140, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will attend the weekly team stand-up meetings.', explanation: 'Attended all weekly team stand-up meetings, providing updates and collaborating on solutions to challenges.', assignee: 'Alex Johnson' },
    { id: 149, title: 'Promise Kept General', dueDate: dayjs().subtract(144, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(146, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(143, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will develop and implement a new feature for the internal CRM system.', explanation: 'Developed and implemented a new feature for the internal CRM system, improving data management and user efficiency.', assignee: 'Sarah Connor' },
    { id: 150, title: 'Teamwork', dueDate: dayjs().subtract(147, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(149, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(146, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will actively participate in cross-functional team meetings.', explanation: 'Actively participated in cross-functional team meetings, contributing insights and fostering collaboration across departments.', assignee: 'Mike Miller' },
    { id: 151, title: 'Promise Kept General', dueDate: dayjs().subtract(150, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(152, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(149, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will prepare a comprehensive report on customer satisfaction metrics.', explanation: 'Prepared a comprehensive report on customer satisfaction metrics, identifying key trends and areas for improvement.', assignee: 'Chris Parker' },
    { id: 152, title: 'Attendance', dueDate: dayjs().subtract(153, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(155, 'day').hour(8).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(152, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will ensure my presence at all client onboarding sessions.', explanation: 'Ensured my presence at all client onboarding sessions, providing support and ensuring a smooth transition for new clients.', assignee: 'Riley Chen' },
    { id: 153, title: 'Promise Kept General', dueDate: dayjs().subtract(156, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(158, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(155, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will develop and implement a new data visualization dashboard.', explanation: 'Developed and implemented a new data visualization dashboard, providing real-time insights into key business metrics.', assignee: 'Jamie Smith' },
    { id: 154, title: 'Teamwork', dueDate: dayjs().subtract(159, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(161, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(158, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will assist in organizing the company\'s quarterly review meeting.', explanation: 'Assisted in organizing the company\'s quarterly review meeting, ensuring all logistics were handled efficiently.', assignee: 'Alex Johnson' },
    {
      id: 155, title: 'Promise Kept General', dueDate: dayjs().subtract(162, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(164, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(161, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will conduct a thorough analysis of our current cybersecurity measures.', explanation: 'Conducted a thorough analysis of our current cybersecurity measures, identifying vulnerabilities and recommending improvements.', assignee: 'Sarah Connor' },
    { id: 156, title: 'Attendance', dueDate: dayjs().subtract(165, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(167, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(164, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will attend all mandatory compliance training sessions.', explanation: 'Attended all mandatory compliance training sessions, ensuring full adherence to regulatory requirements.', assignee: 'Mike Miller', isOverdue: true, },
    { id: 157, title: 'Promise Kept General', dueDate: dayjs().subtract(168, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(170, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(167, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will prepare a detailed report on employee engagement survey results.', explanation: 'Prepared a detailed report on employee engagement survey results, providing insights for improving workplace satisfaction.', assignee: 'Chris Parker' },
    { id: 158, title: 'Teamwork', dueDate: dayjs().subtract(171, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(173, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(170, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will collaborate with the marketing team on new campaign strategies.', explanation: 'Collaborated with the marketing team to develop new campaign strategies, resulting in increased brand visibility.', assignee: 'Riley Chen' },
    { id: 159, title: 'Promise Kept General', dueDate: dayjs().subtract(174, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(176, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(173, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will develop and implement a new automated testing framework.', explanation: 'Developed and implemented a new automated testing framework, significantly reducing manual testing efforts and improving software quality.', assignee: 'Jamie Smith' },
    { id: 160, title: 'Attendance', dueDate: dayjs().subtract(177, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(179, 'day').hour(8).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(176, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will ensure my presence at all investor relations meetings.', explanation: 'Ensured my presence at all investor relations meetings, providing clear and concise updates on company performance.', assignee: 'Alex Johnson' },
    { id: 161, title: 'Promise Kept General', dueDate: dayjs().subtract(180, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(182, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(179, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will conduct a thorough review of all vendor contracts.', explanation: 'Conducted a thorough review of all vendor contracts, identifying cost-saving opportunities and ensuring favorable terms.', assignee: 'Sarah Connor' },
    { id: 162, title: 'Teamwork', dueDate: dayjs().subtract(183, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(185, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(182, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will assist in preparing the annual company budget.', explanation: 'Assisted in preparing the annual company budget, ensuring accurate financial projections and resource allocation.', assignee: 'Mike Miller' },
    { id: 163, title: 'Promise Kept General', dueDate: dayjs().subtract(186, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(188, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(185, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will optimize the cloud infrastructure for cost efficiency.', explanation: 'Optimized the cloud infrastructure, resulting in a 25% reduction in operational costs while maintaining performance.', assignee: 'Chris Parker' },
    { id: 164, title: 'Attendance', dueDate: dayjs().subtract(189, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(191, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(188, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will attend all product roadmap planning sessions.', explanation: 'Attended all product roadmap planning sessions, contributing to strategic decisions and aligning development efforts.', assignee: 'Riley Chen' },
    { id: 165, title: 'Promise Kept General', dueDate: dayjs().subtract(192, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(194, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(191, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will prepare a detailed report on competitor analysis for the new market.', explanation: 'Prepared a detailed report on competitor analysis for the new market, identifying key players and their strategies.', assignee: 'Jamie Smith' },
  ];

  const myUnkeptPromisesItems = [
    {
      id: 9,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(20, 'day').hour(18).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(25, 'day').hour(9).minute(15).format('MMM D, YYYY, hh:mm A'),
      description: 'I promised to deliver the final report on the agreed-upon deadline, including all necessary data and analysis.',
      assignee: 'John Doe',
    },
    {
      id: 10,
      title: 'Attendance',
      dueDate: dayjs().subtract(15, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(18, 'day').hour(9).minute(15).format('MMM D, YYYY, hh:mm A'),
      description: 'I committed to attending the critical client call.',
      assignee: 'Jane Smith',
    },
    {
      id: 11,
      title: 'Teamwork',
      dueDate: dayjs().subtract(10, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(12, 'day').hour(9).minute(15).format('MMM D, YYYY, hh:mm A'),
      description: 'I was going to provide the necessary assets for the marketing campaign, ensuring they were high-quality and on brand.',
      assignee: 'Peter Jones',
    },
  ];

  // Filter active promises (not unkept, and not yet approved)
  const activePromisesItems = allMyPromisesSource.filter(item => 
    !item.approvedDate && !myUnkeptPromisesItems.some(unkept => unkept.id === item.id)
  ).slice(0, 6); // Keep only 6 active commitments

  // Filter completed promises (have an approvedDate)
  const myBadgesItems = allMyPromisesSource.filter(item => !!item.approvedDate);

  const myCommitmentsTabs = [
    {
      label: 'Active Promises',
      count: activePromisesItems.length,
      items: activePromisesItems,
    },
    {
      label: 'My Badges', // Renamed from 'My Promises'
      count: myBadgesItems.length,
      items: myBadgesItems,
    },
    {
      label: 'My Unkept Promises',
      count: myUnkeptPromisesItems.length,
      items: myUnkeptPromisesItems,
    },
  ];

  // --- Data for Others' Commitments ---
  const promisesOwedToMeItems = [
    {
      id: 1,
      title: 'Teamwork',
      dueDate: dayjs().add(2, 'day').hour(11).minute(45).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(5, 'day').hour(16).minute(20).format('MMM D, YYYY, hh:mm A'),
      description: 'I will provide feedback on the new product design mockups for client presentation, focusing on usability and aesthetic appeal.',
      assignee: 'Riley Chen',
      isOverdue: false,
    },
    {
      id: 2,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(1, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), // Make this one overdue
      committedDate: dayjs().subtract(7, 'day').hour(13).minute(5).format('MMM D, YYYY, hh:mm A'),
      description: 'I am going to deliver the quarterly marketing report with all KPIs and campaign results, highlighting key achievements and areas for improvement.',
      assignee: 'Jamie Smith',
      isOverdue: true,
    },
    {
      id: 3,
      title: 'Leadership',
      dueDate: dayjs().add(6, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(9, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will lead the weekly team sync meeting and ensure all action items are captured and assigned.',
      assignee: 'Sarah Connor',
      isOverdue: false,
    },
    {
      id: 4,
      title: 'Attendance',
      dueDate: dayjs().subtract(3, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'), // Make this one overdue
      committedDate: dayjs().subtract(11, 'day').hour(8).minute(30).format('MMM D, YYYY, hh:mm A'),
      description: 'I will attend the all-hands company meeting and provide a summary to my team.',
      assignee: 'Mike Miller',
      isOverdue: true,
    },
    {
      id: 5,
      title: 'Promise Kept General',
      dueDate: dayjs().add(10, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(13, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will finalize the client proposal and send it for review by end of day.',
      assignee: 'Chris Parker',
      isOverdue: false,
    },
    {
      id: 6,
      title: 'Teamwork',
      dueDate: dayjs().add(12, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(15, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will assist with the onboarding of the new junior developer, providing guidance and support.',
      assignee: 'Alex Johnson',
      isOverdue: false,
    },
  ];

  const dailyAnswers = [
    "Refactored the main database query for performance. Learned that indexing a specific column can have a massive impact.",
    "Completed the UI mockups for the new dashboard. The challenge was incorporating feedback from three different stakeholders, which taught me to consolidate feedback before starting.",
    "Wrote unit tests for the authentication module, achieving 95% coverage. I learned a new mocking technique for external services.",
    "Fixed a critical bug in the payment processing system. The lesson was to always validate user input on both the client and server sides.",
    "Deployed the latest build to the staging environment. Learned the importance of having a rollback plan, even for minor updates.",
    "Met with the product team to finalize requirements for the next sprint. Learned to ask more clarifying questions to avoid ambiguity.",
    "Updated the API documentation with the latest endpoints. The challenge was making it clear for non-technical users, improving my technical writing skills.",
    "Investigated a performance bottleneck in the image upload feature. Learned about the trade-offs between image quality and loading speed.",
    "Paired with a junior developer to help them with a complex task. It reinforced my own understanding of the codebase.",
    "Set up a new CI/CD pipeline for the microservice. The lesson was that initial setup takes time but saves hours in the long run.",
    "Analyzed user feedback from the last release. Learned that users often find creative ways to use features that we didn't anticipate.",
    "Created a proof-of-concept for the new real-time notification feature. The challenge was choosing the right WebSocket library.",
    "Participated in a code review for a teammate's feature. Learned a more efficient way to handle asynchronous operations in JavaScript.",
    "Wrote a script to automate the weekly report generation. The lesson is that a few hours of scripting can save many hours of manual work.",
    "Designed the database schema for the upcoming user profile section. Learned about the importance of normalization for data integrity.",
    "Researched third-party APIs for a new integration. The challenge was navigating sparse documentation from one of the providers.",
    "Sketched out the user flow for the password reset feature. Learned that visualizing the flow on paper first saves a lot of time in the design tool.",
    "Finalized the user authentication flow. The main challenge was dealing with legacy code, which taught me the importance of clear documentation."
  ];

  const badgesIssuedItems = [
    {
      id: 166,
      title: 'On Track (Daily)',
      dueDate: dayjs().subtract(1, 'month').format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(2, 'months').format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(1, 'month').add(1, 'day').format('MMM D, YYYY, hh:mm A'),
      description: 'I will provide a daily update on my progress towards the quarterly goals, ensuring transparency and accountability.',
      assignee: 'Riley Chen',
      type: 'nudge',
      responses: dailyAnswers.map((answer, i) => ({
        date: dayjs().subtract(1, 'month').subtract(i, 'days').format('MMM D, YYYY'),
        questions: [
          'What’s one thing you did today that moved you closer to your goal?',
          'What’s one lesson you learned from today’s challenges?'
        ],
        answer: answer
      }))
    },
    {
      id: 101,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(10, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(12, 'day').hour(9).minute(15).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(9, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will complete the mandatory HR compliance training course.',
      explanation: 'I have submitted the form and answered all the questions, ensuring full compliance with company policies and regulations.',
      assignee: 'Chris Parker',
    },
    {
      id: 102,
      title: 'Teamwork',
      dueDate: dayjs().subtract(8, 'day').hour(16).minute(30).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(10, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(7, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will collaborate with the design team on the new UI mockups.',
      explanation: 'We held a final review session and all stakeholders have signed off on the mockups, incorporating feedback from various departments.',
      assignee: 'Riley Chen',
    },
    {
      id: 103,
      title: 'Leadership',
      dueDate: dayjs().subtract(6, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(8, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(5, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will lead the weekly team sync meeting and ensure all action items are captured and assigned.',
      explanation: 'I led the meeting, and the minutes with action items have been circulated to all attendees for their reference and follow-up.',
      assignee: 'Sarah Wilson',
    },
    {
      id: 104,
      title: 'Attendance',
      dueDate: dayjs().subtract(4, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(6, 'day').hour(8).minute(30).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(3, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I commit to attending the full-day workshop on new project management tools.',
      explanation: 'I attended the entire workshop and have shared my notes with the team, highlighting key takeaways and potential applications for our projects.',
      assignee: 'Mike Johnson',
    },
    {
      id: 105,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(2, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(4, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(1, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I am going to update the shared documentation with the latest API specifications.',
      explanation: 'The documentation is now up-to-date on Confluence, and the link has been shared in the relevant communication channel for easy access.',
      assignee: 'Jamie Smith',
    },
    {
      id: 106,
      title: 'Teamwork',
      dueDate: dayjs().subtract(15, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(17, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(14, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will assist the new intern with setting up their development environment.',
      explanation: 'I spent two hours with the intern, and they are now fully set up and ready to start coding, having resolved all initial configuration issues.',
      assignee: 'Alex Johnson',
      isOverdue: true,
    },
    {
      id: 107,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(18, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(20, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(17, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will prepare the quarterly business review (QBR) presentation for all key stakeholders.',
      explanation: 'The QBR presentation is complete and has been shared with all stakeholders, covering key achievements and future strategies.',
      assignee: 'Sarah Connor',
    },
    {
      id: 108,
      title: 'Attendance',
      dueDate: dayjs().subtract(21, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(23, 'day').hour(8).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(20, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will attend the company-wide training session on new software tools.',
      explanation: 'I attended the full training session and gained valuable insights into the new software tools, which I will apply to my work.',
      assignee: 'Mike Miller',
    },
    {
      id: 109,
      title: 'Leadership',
      dueDate: dayjs().subtract(24, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(26, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(23, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will lead the brainstorming session for the next product feature.',
      explanation: 'The brainstorming session was successfully led, resulting in several innovative ideas for the next product feature, which are now being evaluated.',
      assignee: 'Chris Parker',
    },
    {
      id: 110,
      title: 'Teamwork',
      dueDate: dayjs().subtract(27, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(29, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(26, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will collaborate with the sales team to develop new client proposals.',
      explanation: 'I collaborated with the sales team to create compelling new client proposals, which are now ready for presentation.',
      assignee: 'Riley Chen',
    },
    {
      id: 111,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(30, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(32, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(29, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will prepare a detailed report on customer feedback and suggestions.',
      explanation: 'The customer feedback report is complete, providing actionable insights for product improvements and customer satisfaction.',
      assignee: 'Jamie Smith',
    },
    {
      id: 112,
      title: 'Attendance',
      dueDate: dayjs().subtract(33, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(35, 'day').hour(8).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(32, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will ensure timely attendance at all scheduled client meetings.',
      explanation: 'I attended all scheduled client meetings on time, ensuring smooth communication and progress on projects.',
      assignee: 'Alex Johnson',
    },
    {
      id: 113,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(36, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(38, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(35, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will conduct a training session for new employees on our internal tools.',
      explanation: 'The training session for new employees was successfully conducted, covering all essential internal tools and workflows.',
      assignee: 'Sarah Connor',
    },
    {
      id: 114,
      title: 'Teamwork',
      dueDate: dayjs().subtract(39, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(41, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(38, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will assist in organizing the company\'s annual team-building event.',
      explanation: 'I actively assisted in organizing the annual team-building event, contributing to its successful execution and positive feedback.',
      assignee: 'Mike Miller',
    },
    {
      id: 115,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(42, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(44, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(41, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will develop and implement a new feature for the mobile application.',
      explanation: 'The new mobile application feature has been successfully developed and implemented, meeting all specified requirements and improving user experience.',
      assignee: 'Chris Parker',
    },
    {
      id: 116,
      title: 'Attendance',
      dueDate: dayjs().subtract(45, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(47, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(44, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will attend the industry conference to gather insights on emerging trends.',
      explanation: 'I attended the industry conference and gathered valuable insights into emerging trends, which I will share with the team for strategic planning.',
      assignee: 'Riley Chen',
      isOverdue: true,
    },
    {
      id: 117,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(48, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(50, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(47, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will prepare a detailed financial forecast for the next fiscal year.',
      explanation: 'The detailed financial forecast for the next fiscal year is complete, providing a clear outlook for budgeting and resource allocation.',
      assignee: 'Jamie Smith',
    },
    {
      id: 118,
      title: 'Teamwork',
      dueDate: dayjs().subtract(51, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(53, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(50, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will collaborate with cross-functional teams to streamline our workflow.',
      explanation: 'I successfully collaborated with cross-functional teams, resulting in a streamlined workflow that improved efficiency and reduced bottlenecks.',
      assignee: 'Alex Johnson',
    },
    {
      id: 119,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(54, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(56, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(53, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will conduct a thorough market analysis for our new product launch.',
      explanation: 'The comprehensive market analysis for the new product launch is complete, providing key insights into market trends and competitive landscape.',
      assignee: 'Sarah Connor',
    },
    {
      id: 120,
      title: 'Attendance',
      dueDate: dayjs().subtract(57, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(59, 'day').hour(8).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(56, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will ensure my presence at all mandatory company-wide meetings.',
      explanation: 'I attended all mandatory company-wide meetings, staying informed and contributing to important discussions.',
      assignee: 'Mike Miller',
    },
    {
      id: 121,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(60, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(62, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(59, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will design and implement a new database schema for improved performance.',
      explanation: 'Designed and implemented a new database schema, resulting in a 15% improvement in query performance and data retrieval efficiency.',
      assignee: 'Chris Parker',
    },
    {
      id: 122,
      title: 'Teamwork',
      dueDate: dayjs().subtract(63, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(65, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(62, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will provide support to colleagues facing technical challenges.',
      explanation: 'Provided technical support to colleagues, resolving 10 complex issues and ensuring smooth project progression.',
      assignee: 'Riley Chen',
    },
    {
      id: 123,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(66, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(68, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(65, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will prepare a detailed report on the effectiveness of our recent marketing campaigns.',
      explanation: 'Prepared a detailed report on recent marketing campaigns, highlighting key successes and areas for optimization.',
      assignee: 'Jamie Smith',
    },
    {
      id: 124,
      title: 'Attendance',
      dueDate: dayjs().subtract(69, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(71, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(68, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will attend all scheduled client presentations and contribute to discussions.',
      explanation: 'Attended all scheduled client presentations, actively contributing to discussions and addressing client concerns effectively.',
      assignee: 'Alex Johnson',
    },
    {
      id: 125,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(72, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(74, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(71, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will develop and deploy a new microservice to enhance system scalability.',
      explanation: 'Developed and deployed a new microservice, improving system scalability by 20% and reducing latency.',
      assignee: 'Sarah Connor',
    },
    { id: 126, title: 'Teamwork', dueDate: dayjs().subtract(75, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(77, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(74, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will mentor the new intern on best coding practices.', explanation: 'Mentored the new intern for 3 weeks, covering Git, code reviews, and project structure. They are now contributing independently.', assignee: 'Mike Miller', isOverdue: true, },
    { id: 127, title: 'Promise Kept General', dueDate: dayjs().subtract(78, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(80, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(77, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will prepare a detailed report on the Q1 financial performance.', explanation: 'Submitted the Q1 financial report, including revenue, expenses, and profit margins. Presented findings to the board.', assignee: 'Chris Parker' },
    { id: 128, title: 'Attendance', dueDate: dayjs().subtract(81, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(83, 'day').hour(8).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(80, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will attend the weekly marketing sync meeting.', explanation: 'Attended all weekly marketing syncs for Q1, actively participating in strategy discussions and task assignments.', assignee: 'Riley Chen' },
    { id: 129, title: 'Promise Kept General', dueDate: dayjs().subtract(84, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(86, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(83, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will update the company website with new product features.', explanation: 'Successfully updated the company website with the latest product features, including new images and descriptions. Verified functionality across browsers.', assignee: 'Jamie Smith' },
    { id: 130, title: 'Teamwork', dueDate: dayjs().subtract(87, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(89, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(86, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will assist the HR team with new employee onboarding.', explanation: 'Assisted HR with onboarding 5 new employees, preparing welcome kits and conducting initial orientation sessions.', assignee: 'Alex Johnson' },
    { id: 131, title: 'Promise Kept General', dueDate: dayjs().subtract(90, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(92, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(89, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will conduct a security audit of the new payment gateway.', explanation: 'Completed a comprehensive security audit of the new payment gateway, identifying and resolving 3 critical vulnerabilities.', assignee: 'Sarah Connor' },
    { id: 132, title: 'Attendance', dueDate: dayjs().subtract(93, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(95, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(92, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will attend the annual company retreat.', explanation: 'Attended the annual company retreat, participated in all team-building activities, and contributed to strategic planning sessions.', assignee: 'Mike Miller' },
    { id: 133, title: 'Promise Kept General', dueDate: dayjs().subtract(96, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'), committedDate: dayjs().subtract(98, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'), approvedDate: dayjs().subtract(95, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'), description: 'I will develop a new feature for the internal dashboard.', explanation: 'Developed and deployed the new analytics feature for the internal dashboard, improving data visualization for managers<dyad-problem-report summary="28 problems">
<problem file="src/components/CommitmentsSection.tsx" line="1510" column="14" code="1136">Property assignment expected.</problem>
<problem file="src/components/CommitmentsSection.tsx" line="1511" column="11" code="1003">Identifier expected.</problem>
<problem file="src/components/CommitmentsSection.tsx" line="1511" column="13" code="17015">Expected corresponding closing tag for JSX fragment.</problem>
<problem file="src/components/CommitmentsSection.tsx" line="1512" column="9" code="1109">Expression expected.</problem>
<problem file="src/components/CommitmentsSection.tsx" line="1516" column="8" code="1109">Expression expected.</problem>
<problem file="src/components/CommitmentsSection.tsx" line="1523" column="5" code="1128">Declaration or statement expected.</problem>
<problem file="src/components/CommitmentsSection.tsx" line="1523" column="7" code="1109">Expression expected.</problem>
<problem file="src/components/CommitmentsSection.tsx" line="1524" column="3" code="1109">Expression expected.</problem>
<problem file="src/components/CommitmentsSection.tsx" line="1525" column="1" code="1128">Declaration or statement expected.</problem>
<problem file="src/components/CommitmentsSection.tsx" line="215" column="10" code="6133">'makePromiseModalOpen' is declared but its value is never read.</problem>
<problem file="src/components/CommitmentsSection.tsx" line="216" column="10" code="6133">'makePromiseModalType' is declared but its value is never read.</problem>
<problem file="src/components/CommitmentsSection.tsx" line="225" column="9" code="6133">'handleCloseMakePromiseModal' is declared but its value is never read.</problem>
<problem file="src/components/CommitmentsSection.tsx" line="240" column="5" code="2304">Cannot find name 'setShowClarificationSuccessModal'.</problem>
<problem file="src/components/CommitmentsSection.tsx" line="628" column="5" code="2304">Cannot find name 'setShowClarificationSuccessModal'.</problem>
<problem file="src/components/CommitmentsSection.tsx" line="661" column="9" code="6133">'handleConfirmBulkReject' is declared but its value is never read.</problem>
<problem file="src/components/CommitmentsSection.tsx" line="1475" column="15" code="2552">Cannot find name 'showClarificationSuccessModal'. Did you mean 'handleCloseClarificationSuccessModal'?</problem>
<problem file="src/components/CommitmentsSection.tsx" line="1504" column="8" code="2741">Property 'onConfirm' is missing in type '{ open: boolean; onClose: () =&gt; void; title: string; description: Element; }' but required in type 'ConfirmationModalProps'.</problem>
<problem file="src/components/CommitmentsSection.tsx" line="1509" column="39" code="2769">No overload matches this call.
  Overload 1 of 2, '(props: { component: ElementType&lt;any, keyof IntrinsicElements&gt;; } &amp; TypographyOwnProps &amp; CommonProps &amp; Omit&lt;any, &quot;color&quot; | ... 112 more ... | &quot;variantMapping&quot;&gt;): Element | null', gave the following error.
    Type 'boolean' is not assignable to type 'SxProps&lt;Theme&gt; | undefined'.
  Overload 2 of 2, '(props: DefaultComponentProps&lt;TypographyTypeMap&lt;{}, &quot;span&quot;&gt;&gt;): Element | null', gave the following error.
    Type 'boolean' is not assignable to type 'SxProps&lt;Theme&gt; | undefined'.</problem>
<problem file="src/components/CommitmentsSection.tsx" line="1510" column="13" code="2349">This expression is not callable.
  Type '{}' has no call signatures.</problem>
<problem file="src/components/CommitmentsSection.tsx" line="1513" column="9" code="2552">Cannot find name 'onConfirm'. Did you mean 'confirm'?</problem>
<problem file="src/components/CommitmentsSection.tsx" line="1513" column="20" code="18004">No value exists in scope for the shorthand property 'handleConfirmBulkReject'. Either declare one or provide an initializer.</problem>
<problem file="src/components/CommitmentsSection.tsx" line="1514" column="9" code="2304">Cannot find name 'confirmText'.</problem>
<problem file="src/components/CommitmentsSection.tsx" line="1515" column="9" code="2304">Cannot find name 'confirmColor'.</problem>
<problem file="src/components/CommitmentsSection.tsx" line="1515" column="22" code="2362">The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.</problem>
<problem file="src/components/CommitmentsSection.tsx" line="1515" column="22" code="2365">Operator '&gt;' cannot be applied to types 'number' and 'Element'.</problem>
<problem file="src/components/CommitmentsSection.tsx" line="1519" column="15" code="2304">Cannot find name 'makePromiseModalOpen'.</problem>
<problem file="src/components/CommitmentsSection.tsx" line="1520" column="18" code="2304">Cannot find name 'handleCloseMakePromiseModal'.</problem>
<problem file="src/components/CommitmentsSection.tsx" line="1521" column="15" code="2304">Cannot find name 'makePromiseModalType'.</problem>
</dyad-problem-report><think>**Debugging TypeScript Errors**

I'm currently wading through a swamp of 28 TypeScript errors. Most of them stem from incorrect JSX syntax, particularly within `Typography` components. It appears I've mistakenly used template literals directly as JSX children, forgetting the necessary curly braces for expression evaluation. I'm also finding some issues with missing imports, which need to be resolved.


**Resolving JSX Syntax**

I'm zeroing in on the JSX syntax errors, primarily within the `Typography` components. The issue remains:  I'm mistakenly using template literals directly as children without curly braces.  I've identified the specific lines, and my strategy is to swiftly apply the necessary `{}`  wrappers for proper expression evaluation. This should eliminate the bulk of these syntax issues. I'm also ensuring the required props like `onConfirm` are supplied to components such as `ConfirmationModal`, which will address a couple of related errors.


**Rectifying Syntax Issues**

I'm focused on resolving the JSX syntax errors, specifically in the `Typography` components. Initially, I thought that I had resolved most, but I'm finding more cases where template literals are directly used as children without being wrapped in curly braces. I'm carefully reviewing these instances and wrapping the entire template literal in `{}` to ensure the expressions are properly evaluated within the JSX context. I'm also double-checking closing tags and prop structures.


**Refining Syntax and Props**

The syntax within `Typography` components remains the primary hurdle. I'm focusing on those expressions within children and making sure they're correctly wrapped with `{}`. This should address the bulk of the "expression expected" errors. I'm also addressing the missing `onConfirm` prop for the `ConfirmationModal` component. Lastly, I'm verifying the proper use of  `confirmText` and `confirmColor` as props, ensuring the proper data flow in the component's structure.


**Fixing Syntax Errors**

I'm now fully focused on fixing the root cause: JSX syntax errors. I've pinpointed specific instances where template literals within `Typography` components are causing issues due to missing curly braces. My strategy is to systematically wrap those expressions in `{}` to ensure correct parsing and evaluation. I will also double-check the `ConfirmationModal` component to make sure the prop passing is done correctly.



**Correcting TypeScript Issues**

I'm now fully focused on addressing the 28 TypeScript errors, prioritizing syntax and type issues.  I'm systematically fixing the malformed JSX syntax in `Typography` components and confirming the proper prop passing in the `ConfirmationModal`. I'm also ensuring the correct initialization of `useState` for `showClarificationSuccessModal` and other variables. Finally, I'm cleaning up unused variables to keep things tidy.


**Tackling Errors Systematically**

My focus is now on the 28 TypeScript errors, specifically addressing the malformed JSX within `Typography` components and the `ConfirmationModal` component's prop handling. I'm prioritizing the `Typography` fixes to resolve the root cause of many of the issues. Subsequently, I'll ensure `onConfirm` and the other props are passed to `ConfirmationModal` correctly. I also fixed the initialization of `setShowClarificationSuccessModal` and confirmed `expandedRows` are correctly typed. I will then verify the proper usage of all the variables and make sure the imports are set correctly.


**Systematizing TypeScript Fixes**

I'm now implementing the fixes systematically. I've corrected the `useState` initialization for `expandedRows` and added `setShowClarificationSuccessModal`. Next, I'll tackle the JSX syntax errors in the `Typography` components, especially within the `ConfirmationModal` descriptions, to ensure the props are passed and recognized correctly. This should clear up a significant number of errors and improve type inference.


**Rectifying Type and Syntax Issues**

I'm systematically tackling the TypeScript errors. I've corrected the `useState` initialization for `expandedRows` and added `showClarificationSuccessModal`'s state. Now, I'm focusing on the JSX syntax within the `ConfirmationModal` descriptions, ensuring proper expression wrapping and prop handling to minimize cascading errors. I'm also addressing the file-level issues related to `export default`.


**Streamlining Error Corrections**

My focus is now on the JSX syntax in the `ConfirmationModal` descriptions within `CommitmentsSection`, prioritizing the error fixes. The `onConfirm`, `confirmText`, and `confirmColor` props are now correctly used, and the initialization of `expandedRows` and `showClarificationSuccessModal` is verified. I'm double-checking the closing tags and expressions to reduce compile-time issues.


</think>It looks like the TypeScript errors are primarily due to incorrect JSX syntax within the `Typography` components inside the `ConfirmationModal` descriptions, and an incorrect initialization of the `expandedRows` state. These issues are causing a cascade of other errors, including those related to unused variables and missing properties.

I'll fix these by:
1.  Correcting the `expandedRows` state initialization to use `useState` properly with a `Set`.
2.  Adding the missing `showClarificationSuccessModal` state variable.
3.  Fixing the template literal syntax within the `Typography` components in the `ConfirmationModal` descriptions to ensure they are correctly wrapped in curly braces `{}`.

These changes should resolve all the reported compilation errors.

<dyad-write path="src/components/CommitmentsSection.tsx" description="Fixing TypeScript compilation errors related to JSX syntax, state initialization, and missing state variable.">
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  TextField,
  Checkbox,
  Stack,
  Popover,
  Button,
  alpha,
  SelectChangeEvent,
  SxProps,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import {
  Person,
  CalendarToday,
  Search,
  ArrowUpward,
  Check,
  Close,
  KeyboardArrowUp,
  KeyboardArrowDown,
  Remove,
} from '@mui/icons-material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import CommitmentListItem from './CommitmentListItem';
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
import CommitmentsTable from './CommitmentsTable';
import { Switch, FormControlLabel } from '@mui/material';

dayjs.extend(isBetween);

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
  nudgesLeft?: number;
  totalNudges?: number;
  isExternal?: boolean;
  questions?: string[];
  explanation?: string;
  responses?: { date: string; answer: string; questions?: string[] }[];
  isOverdue?: boolean;
}

interface CommitmentsSectionProps {
  title:string;
  tabs: { label: string; count: number; items: Commitment[] }[];
  displayMode?: 'regular' | 'table';
  onToggleDisplayMode?: (mode: 'regular' | 'table') => void;
  showClearAllFilters?: boolean;
  isActionsPage?: boolean;
  isCommitmentPortfolioPage?: boolean;
}

const parseCommitmentDate = (dateString: string): Dayjs | null => {
  try {
    if (dateString === 'Today') return dayjs().startOf('day');
    let cleanDateString = dateString;
    if (dateString.startsWith('Completed ')) {
      cleanDateString = dateString.substring('Completed '.length);
    } else if (dateString === 'Pending') {
      return null;
    }
    
    const date = dayjs(cleanDateString, ['MMM D, hh:mm A', 'MMM D, YYYY, hh:mm A', 'MMM D', 'MMM D, YYYY'], true);
    return date.isValid() ? date : null;
  } catch (error) {
    return null;
  }
};

const parseCommittedDate = (dateString?: string): Dayjs | null => {
  if (!dateString) return null;
  try {
    let cleanDateString = dateString;
    if (dateString.startsWith('Requested on ')) {
      cleanDateString = dateString.substring('Requested on '.length);
    }
    const date = dayjs(cleanDateString, ['MMM D, hh:mm A', 'MMM D, YYYY, hh:mm A', 'MMM D, YYYY'], true);
    return date.isValid() ? date : null;
  }
  catch (error) {
    return null;
  }
};

const groupMembers: { [key: string]: string[] } = {
  'Development team': ['Alex Johnson', 'Chris Parker'],
  'Customer facing team': ['Riley Chen'],
  'Official co-op': ['Alex Johnson', 'Chris Parker', 'Riley Chen'],
  'Part-timers': ['Chris Parker'],
};

const CommitmentsSection: React.FC<CommitmentsSectionProps> = ({ title, tabs, displayMode = 'regular', onToggleDisplayMode, showClearAllFilters = true, isActionsPage = false, isCommitmentPortfolioPage = false }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [personFilter, setPersonFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('All');
  const [sortBy, setSortBy] = useState('dueDateNewest');
  const [searchTerm, setSearchTerm] = useState('');
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set()); // Fixed: Correct useState initialization
  
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [tempDateRange, setTempDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null);

  const [badgeTableFilter, setBadgeTableFilter] = useState('');
  const [commitmentTextTableFilter, setCommitmentTextTableFilter] = useState('');
  const [assigneeTableFilter, setAssigneeTableFilter] = useState('');
  const [dueDateTableFilter, setDueDateTableFilter] = useState<Dayjs | null>(null);
  const [committedDateTableFilter, setCommittedDateTableFilter] = useState<Dayjs | null>(null);
  const [approvedDateTableFilter, setApprovedDateTableFilter] = useState<Dayjs | null>(null);

  const [commitmentForDetails, setCommitmentForDetails] = useState<Commitment | null>(null);
  const [commitmentToAccept, setCommitmentToAccept] = useState<Commitment | null>(null);
  const [commitmentToDecline, setCommitmentToDecline] = useState<Commitment | null>(null);
  const [commitmentToRevoke, setCommitmentToRevoke] = useState<Commitment | null>(null);
  const [commitmentToClarify, setCommitmentToClarify] = useState<Commitment | null>(null);
  const [selectedBadge, setSelectedBadge] = useState<Commitment | null>(null);
  const [commitmentForNudgeDetails, setCommitmentForNudgeDetails] = useState<Commitment | null>(null);
  const [commitmentForAnswerNudge, setCommitmentForAnswerNudge] = useState<Commitment | null>(null);
  const [commitmentToReject, setCommitmentToReject] = useState<Commitment | null>(null);
  const [commitmentForBadgeRequest, setCommitmentForBadgeRequest] = useState<Commitment | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const handleCloseDetailsModal = useCallback(() => setModalOpen(false), []);

  const [requestBadgeModalOpen, setRequestBadgeModalOpen] = useState(false);
  const handleCloseRequestBadgeModal = useCallback(() => setRequestBadgeModalOpen(false), []);

  const [bulkRequestModalOpen, setBulkRequestModalOpen] = useState(false);
  const handleCloseBulkRequestModal = useCallback(() => setBulkRequestModalOpen(false), []);

  const [badgeDetailsModalOpen, setBadgeDetailsModalOpen] = useState(false);
  const handleCloseBadgeDetailsModal = useCallback(() => setBadgeDetailsModalOpen(false), []);

  const [badgeRequestDetailsModalOpen, setBadgeRequestDetailsModalOpen] = useState(false);
  const handleCloseBadgeRequestDetailsModal = useCallback(() => setBadgeRequestDetailsModalOpen(false), []);

  const [acceptModalOpen, setAcceptModalOpen] = useState(false);
  const handleCloseAcceptModal = useCallback(() => setAcceptModalOpen(false), []);

  const [acceptNudgeModalOpen, setAcceptNudgeModalOpen] = useState(false);
  const handleCloseAcceptNudgeModal = useCallback(() => setAcceptNudgeModalOpen(false), []);

  const [bulkDeclineModalOpen, setBulkDeclineModalOpen] = useState(false);
  const handleCloseBulkDeclineModal = useCallback(() => setBulkDeclineModalOpen(false), []);

  const [individualDeclineModalOpen, setIndividualDeclineModalOpen] = useState(false);
  const handleCloseIndividualDeclineModal = useCallback(() => setIndividualDeclineModalOpen(false), []);

  const [revokeModalOpen, setRevokeModalOpen] = useState(false);
  const handleCloseRevokeModal = useCallback(() => setRevokeModalOpen(false), []);

  const [clarifyModalOpen, setClarifyModalOpen] = useState(false);
  const handleCloseClarifyModal = useCallback(() => setClarifyModalOpen(false), []);

  const [bulkAcceptModalOpen, setBulkAcceptModalOpen] = useState(false);
  const handleCloseBulkAcceptModal = useCallback(() => setBulkAcceptModalOpen(false), []);

  const [answerNudgeModalOpen, setAnswerNudgeModalOpen] = useState(false);
  const handleCloseAnswerNudgeModal = useCallback(() => setAnswerNudgeModalOpen(false), []);

  const [nudgeDetailsModalOpen, setNudgeDetailsModalOpen] = useState(false);
  const handleCloseNudgeDetailsModal = useCallback(() => setNudgeDetailsModalOpen(false), []);

  const [bulkClarifyModalOpen, setBulkClarifyModalOpen] = useState(false);
  const handleCloseBulkClarifyModal = useCallback(() => setBulkClarifyModalOpen(false), []);

  const [bulkRevokeModalOpen, setBulkRevokeModalOpen] = useState(false);
  const handleCloseBulkRevokeModal = useCallback(() => setBulkRevokeModalOpen(false), []);

  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [requesterForApproval, setRequesterForApproval] = useState('');
  const [rejectBadgeModalOpen, setRejectBadgeModalOpen] = useState(false);

  const [bulkApproveModalOpen, setBulkApproveModalOpen] = useState(false);
  const [bulkRejectModalOpen, setBulkRejectModalOpen] = useState(false);
  const [bulkApprovalSuccessOpen, setBulkApprovalSuccessOpen] = useState(false);

  const [showClarificationSuccessModal, setShowClarificationSuccessModal] = useState(false); // Added missing state

  const [makePromiseModalOpen, setMakePromiseModalOpen] = useState(false);
  const [makePromiseModalType, setMakePromiseModalType] = useState<'promise' | 'request'>('promise');

  const [containerContentHeight, setContainerContentHeight] = useState<number | string>('auto');

  const handleOpenMakePromiseModal = (type: 'promise' | 'request') => {
    setMakePromiseModalType(type);
    setMakePromiseModalOpen(true);
  };

  const handleCloseMakePromiseModal = useCallback(() => {
    setMakePromiseModalOpen(false);
  }, []);

  const handleCloseApprovalModal = useCallback(() => {
    setApprovalModalOpen(false);
    setRequesterForApproval('');
  }, []);

  const handleCloseRejectBadgeModal = useCallback(() => {
    setRejectBadgeModalOpen(false);
    setCommitmentToReject(null);
  }, []);

  const handleCloseClarificationSuccessModal = useCallback(() => {
    setShowClarificationSuccessModal(false);
  }, []);

  const handleApproveBadgeRequest = (commitment: Commitment) => {
    console.log('Approving badge request:', commitment.id);
    setCommitments(prev => prev.filter(c => c.id !== commitment.id));
    setApprovalModalOpen(true);
    setRequesterForApproval(commitment.assignee);
  };

  const handleRejectBadgeRequest = (commitment: Commitment) => {
    console.log('Rejecting badge request:', commitment.id);
    setCommitments(prev => prev.filter(c => c.id !== commitment.id));
    setCommitmentToReject(commitment);
    setRejectBadgeModalOpen(true);
  };

  const handleConfirmRejectBadge = () => {
    console.log('Confirming rejection of badge request:', commitmentToReject?.id);
    setRejectBadgeModalOpen(false);
    setCommitmentToReject(null);
  };

  useEffect(() => {
    setCommitments(tabs[activeTab].items.map(item => ({ ...item, selected: false })));
    setSelectAll(false);
    setExpandedRows(new Set());
    const currentTabLabel = tabs[activeTab].label;
    const disableFiltersForCurrentTab = currentTabLabel === 'Requests to Commit' || currentTabLabel === 'Awaiting Response' || currentTabLabel === 'Active Promises';

    if (disableFiltersForCurrentTab) {
      setDateFilter('All');
      setSortBy('dueDateNewest');
      setSearchTerm('');
      setDateRange([null, null]);
      setTempDateRange([null, null]);
    }

    if (currentTabLabel === 'My Badges' || currentTabLabel === 'Badges Issued') {
      setSortBy('approvedDateNewest');
    } else {
      setSortBy('dueDateNewest');
    }

    setBadgeTableFilter('');
    setCommitmentTextTableFilter('');
    setAssigneeTableFilter('');
    setDueDateTableFilter(null);
    setCommittedDateTableFilter(null);
    setApprovedDateTableFilter(null);
  }, [activeTab, tabs]);

  const isActivePromisesTab = tabs[activeTab].label === 'Active Promises';
  const isMyPromisesTab = tabs[activeTab].label === 'My Promises';
  const isRequestsToCommitTab = tabs[activeTab].label === 'Requests to Commit';
  const isAwaitingResponseTab = tabs[activeTab].label === 'Awaiting Response';
  const isOwedToMe = tabs[activeTab].label === 'Promises Owed to Me';
  const isBadgeRequestsTab = tabs[activeTab].label === 'Badge Requests';
  const isMyBadgesTab = tabs[activeTab].label === 'My Badges';
  const isUnkeptTab = tabs[activeTab].label.includes('Unkept');
  const isBadgesIssuedTab = tabs[activeTab].label === 'Badges Issued';

  const disableAllFiltersExceptSort = isRequestsToCommitTab || isAwaitingResponseTab;

  const allAssignees = tabs.flatMap(tab => tab.items.filter(item => !item.isExternal).map(item => item.assignee));
  const uniquePeople = [...new Set(allAssignees)].filter(name => name !== 'Dev Team Lead');
  const filterOptions = [...uniquePeople, 'Development team'];
  const hasExternal = tabs.some(tab => tab.items.some(item => item.isExternal));

  const processedCommitments = commitments.map(item => ({
    ...item,
    isOverdue: item.isOverdue || (!isUnkeptTab && !isMyBadgesTab && !isBadgesIssuedTab && (parseCommitmentDate(item.dueDate) ? parseCommitmentDate(item.dueDate)!.isBefore(dayjs(), 'day') : false))
  }));

  const currentItems = processedCommitments.filter(item => {
    const searchMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assignee.toLowerCase().includes(searchTerm.toLowerCase());

    if (!searchMatch) return false;

    const personMatch = (() => {
      if (!personFilter) return true;
      if (personFilter === 'External') return item.isExternal === true;
      if (personFilter === 'Development team') {
        return groupMembers['Development team'].includes(item.assignee);
      }
      return item.assignee === personFilter;
    })();
    if (!personMatch) return false;

    const itemDate = parseCommitmentDate(item.dueDate);
    let dateMatch = true;

    if (dateFilter === 'Custom Range' && dateRange[0] && dateRange[1] && itemDate) {
      dateMatch = !itemDate.isBefore(dateRange[0], 'day') && !itemDate.isAfter(dateRange[1], 'day');
    } else if (dateFilter === 'Today') {
      dateMatch = itemDate ? itemDate.isSame(dayjs(), 'day') : false;
    } else if (dateFilter === 'This Week') {
      dateMatch = itemDate ? itemDate.isBetween(dayjs().startOf('week'), dayjs().endOf('week'), null, '[]') : false;
    }
    
    if (!dateMatch) return false;

    if (displayMode === 'table') {
      if (badgeTableFilter && item.title !== badgeTableFilter) return false;
      if (commitmentTextTableFilter && !item.description.toLowerCase().includes(commitmentTextTableFilter.toLowerCase())) return false;
      if (assigneeTableFilter && item.assignee !== assigneeTableFilter) return false;
      
      const itemDueDate = parseCommitmentDate(item.dueDate);
      if (dueDateTableFilter && itemDueDate && !itemDueDate.isSame(dueDateTableFilter, 'day')) return false;

      const itemCommittedDate = item.committedDate ? parseCommitmentDate(item.committedDate) : null;
      if (committedDateTableFilter && itemCommittedDate && !itemCommittedDate.isSame(committedDateTableFilter, 'day')) return false;

      const itemApprovedDate = item.approvedDate ? dayjs(item.approvedDate, 'MMM D, YYYY, hh:mm A') : null;
      if (approvedDateTableFilter && itemApprovedDate && !itemApprovedDate.isSame(approvedDateTableFilter, 'day')) return false;
    }

    return true;
  }).sort((a, b) => {
    const aIsNudge = a.type === 'nudge';
    const bIsNudge = b.type === 'nudge';
    if (aIsNudge && !bIsNudge) return -1;
    if (!aIsNudge && bIsNudge) return 1;

    let effectiveSortBy = sortBy;
    if (sortBy === 'nudges') {
      if (isMyBadgesTab || isBadgesIssuedTab) {
        effectiveSortBy = 'approvedDateNewest';
      } else {
        effectiveSortBy = 'dueDateNewest';
      }
    }

    let dateA, dateB;
    switch (effectiveSortBy) {
      case 'dueDateNewest':
      case 'dueDateOldest':
        dateA = parseCommitmentDate(a.dueDate);
        dateB = parseCommitmentDate(b.dueDate);
        break;
      case 'committedDateNewest':
      case 'committedDateOldest':
        dateA = parseCommittedDate(a.committedDate);
        dateB = parseCommittedDate(b.committedDate);
        break;
      case 'approvedDateNewest':
      case 'approvedDateOldest':
        dateA = a.approvedDate ? dayjs(a.approvedDate, 'MMM D, YYYY, hh:mm A') : null;
        dateB = b.approvedDate ? dayjs(b.approvedDate, 'MMM D, YYYY, hh:mm A') : null;
        break;
      case 'overdue':
        return (b.isOverdue ? 1 : 0) - (a.isOverdue ? 1 : 0);
      default:
        return 0;
    }

    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;

    if (effectiveSortBy.includes('Newest')) {
      return dateB.valueOf() - dateA.valueOf();
    } else if (effectiveSortBy.includes('Oldest')) {
      return dateA.valueOf() - dateB.valueOf();
    }
    return 0;
  });

  const paginatedItems = currentItems;

  useEffect(() => {
    if (firstItemRef.current) {
      const observer = new ResizeObserver(entries => {
        for (let entry of entries) {
          setFirstItemObservedHeight(entry.contentRect.height);
        }
      });
      observer.observe(firstItemRef.current);
      return () => observer.disconnect();
    }
  }, [paginatedItems.length, displayMode]);

  const firstItemRef = useRef<HTMLDivElement>(null);
  const [firstItemObservedHeight, setFirstItemObservedHeight] = useState<number | null>(null);

  useEffect(() => {
    if (displayMode === 'table') {
      setContainerContentHeight('auto');
      return;
    }

    if (paginatedItems.length === 0) {
      setContainerContentHeight('250px');
    } else if (firstItemObservedHeight !== null) {
      const cardHeight = firstItemObservedHeight;
      const spacing = 8;

      if (paginatedItems.length === 1) {
        setContainerContentHeight(cardHeight);
      } else {
        setContainerContentHeight((cardHeight * 2) + spacing);
      }
    }
  }, [paginatedItems.length, displayMode, firstItemObservedHeight]);

  const handleViewCommitmentDetails = (item: Commitment) => {
    if (isBadgeRequestsTab) {
      setCommitmentForBadgeRequest(item);
      setBadgeRequestDetailsModalOpen(true);
    } else if (item.type === 'nudge' && (isMyPromisesTab || isRequestsToCommitTab)) {
      setCommitmentForNudgeDetails(item);
      setNudgeDetailsModalOpen(true);
    } else if (isMyBadgesTab || isBadgesIssuedTab) {
      handleViewBadgeDetails(item);
    }
    else {
      setCommitmentForDetails(item);
      setModalOpen(true);
    }
  };

  const handleRequestBadge = () => setRequestBadgeModalOpen(true);
  
  const handleRequestBadgeFromDetails = () => {
    setModalOpen(false);
    setRequestBadgeModalOpen(true);
  };

  const handleViewBadgeDetails = (badge: Commitment) => {
    setSelectedBadge(badge);
    setBadgeDetailsModalOpen(true);
  };

  const handleToggleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    setCommitments(prev => prev.map(item => {
      const isNudgeInMyPromises = isMyPromisesTab && item.type === 'nudge';
      const isItemInActivePromises = isActivePromisesTab;
      return { ...item, selected: (isNudgeInMyPromises || isItemInActivePromises) ? false : checked };
    }));
  };

  const handleToggleSelectItem = (id: number, checked: boolean) => {
    setCommitments(prev => prev.map(item =>
      item.id === id ? { ...item, selected: checked } : item
    ));
    if (!checked) setSelectAll(false);
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    if (!newValue) return;
    const [start] = tempDateRange;
    if (!start || (start && tempDateRange[1])) {
      setTempDateRange([newValue, null]);
    } else {
      if (newValue.isBefore(start)) {
        setTempDateRange([newValue, start]);
      } else {
        setTempDateRange([start, newValue]);
      }
    }
  };

  const handleClosePopover = () => setPopoverAnchor(null);
  
  const handleApplyDateRange = () => {
    setDateRange(tempDateRange);
    handleClosePopover();
  };

  const handleClearDateRange = () => {
    setTempDateRange([null, null]);
    setDateRange([null, null]);
    handleClosePopover();
  };

  const handleDateFilterChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setDateFilter(value);
    if (value !== 'Custom Range') {
      setDateRange([null, null]);
    }
  };

  const handleCustomRangeClick = (event: React.MouseEvent<HTMLElement>) => {
    setTempDateRange(dateRange);
    setPopoverAnchor(event.currentTarget);
  };

  const handleAcceptClick = (item: Commitment) => {
    setCommitmentToAccept(item);
    if (item.type === 'nudge') {
      setAcceptNudgeModalOpen(true);
    } else {
      setAcceptModalOpen(true);
    }
  };

  const handleDeclineClick = (item: Commitment) => {
    setCommitmentToDecline(item);
    setIndividualDeclineModalOpen(true);
  };

  const handleConfirmIndividualDecline = () => {
    console.log('Declining commitment:', commitmentToDecline?.id);
    setIndividualDeclineModalOpen(false);
    setCommitmentToDecline(null);
  };

  const handleAcceptFromDetails = () => {
    setModalOpen(false);
    if (commitmentForDetails) {
      handleAcceptClick(commitmentForDetails);
    }
  };

  const handleDeclineFromDetails = () => {
    setModalOpen(false);
    if (commitmentForDetails) {
      handleDeclineClick(commitmentForDetails);
    }
  };

  const handleCommit = (date: Dayjs | null, time: Dayjs | null) => {
    console.log('Committed with date:', date?.format(), 'and time:', time?.format(), 'for commitment:', commitmentToAccept?.id);
    setCommitmentToAccept(null);
  };

  const handleConfirmBulkDecline = () => {
    console.log('Bulk declining commitments:', selectedCommitments.map(c => c.id));
    setBulkDeclineModalOpen(false);
    setCommitments(prev => prev.map(item => ({ ...item, selected: false })));
    setSelectAll(false);
  };

  const handleBulkAccept = () => {
    setBulkAcceptModalOpen(true);
  };

  const handleAnswerNudge = (item: Commitment) => {
    setCommitmentForAnswerNudge(item);
    setAnswerNudgeModalOpen(true);
  };

  const handleAnswerNudgeFromDetails = () => {
    setNudgeDetailsModalOpen(false);
    if (commitmentForNudgeDetails) {
      handleAnswerNudge(commitmentForNudgeDetails);
    }
  };

  const handleAcceptNudgeFromDetails = () => {
    setNudgeDetailsModalOpen(false);
    if (commitmentForNudgeDetails) {
      handleAcceptClick(commitmentForNudgeDetails);
    }
  };

  const handleDeclineNudgeFromDetails = () => {
    setNudgeDetailsModalOpen(false);
    if (commitmentForNudgeDetails) {
      handleDeclineClick(commitmentForNudgeDetails);
    }
  };

  const handleRevokeClick = (item: Commitment) => {
    setCommitmentToRevoke(item);
    setRevokeModalOpen(true);
  };

  const handleConfirmRevoke = () => {
    console.log('Revoking commitment:', commitmentToRevoke?.id);
    setRevokeModalOpen(false);
    setCommitmentToRevoke(null);
  };

  const handleClarifyClick = (item: Commitment) => {
    setCommitmentToClarify(item);
    setClarifyModalOpen(true);
  };

  const handleSendClarification = (message: string) => {
    console.log(`Clarification request for ${commitmentToClarify?.id}: ${message}`);
    setClarifyModalOpen(false);
    setCommitmentToClarify(null);
    setShowClarificationSuccessModal(true);
  };

  const handleRevokeFromDetails = () => {
    setModalOpen(false);
    if (commitmentForDetails) {
      handleRevokeClick(commitmentForDetails);
    }
  };

  const handleClarifyFromDetails = () => {
    setModalOpen(false);
    if (commitmentForDetails) {
      handleClarifyClick(commitmentForDetails);
    }
  };

  const handleConfirmBulkRevoke = () => {
    console.log('Bulk revoking commitments:', selectedCommitments.map(c => c.id));
    setBulkRevokeModalOpen(false);
    setCommitments(prev => prev.map(item => ({ ...item, selected: false })));
    setSelectAll(false);
  };

  const handleConfirmBulkApprove = () => {
    const selectedIds = selectedCommitments.map(c => c.id);
    console.log('Bulk approving commitments:', selectedIds);
    setCommitments(prev => prev.filter(c => !selectedIds.includes(c.id)));
    setBulkApproveModalOpen(false);
    setBulkApprovalSuccessOpen(true);
    setSelectAll(false);
  };
  
  const handleConfirmBulkReject = () => {
    console.log('Bulk rejecting commitments:', selectedCommitments.map(c => c.id));
    const selectedIds = selectedCommitments.map(c => c.id);
    setCommitments(prev => prev.filter(c => !selectedIds.includes(c.id)));
    setBulkRejectModalOpen(false);
    setSelectAll(false);
  };

  const selectedCommitments = commitments.filter(item => item.selected);
  const selectedCount = selectedCommitments.length;
  
  let itemColor = '#ff7043';

  if (title.trim() === "Others' Commitments") {
    itemColor = '#1976d2';
  } else {
    itemColor = '#ff7043';
  }

  if (isUnkeptTab) {
    itemColor = '#4F4F4F';
  }

  const showBulkActionsSection = isActionsPage && paginatedItems.length > 0 && !isUnkeptTab && !isMyBadgesTab;

  const showBulkRequest = isActionsPage && selectedCount > 0 && isMyPromisesTab;
  const showBulkClarify = isActionsPage && selectedCount > 0 && isOwedToMe;
  const showBulkRevoke = isActionsPage && selectedCount > 0 && isAwaitingResponseTab;

  const isOthersCommitmentsSection = title.trim() === "Others' Commitments";

  const handleTableFilterChange = useCallback((filterName: string, value: any) => {
    switch (filterName) {
      case 'badge':
        setBadgeTableFilter(value);
        break;
      case 'commitmentText':
        setCommitmentTextTableFilter(value);
        break;
      case 'assignee':
        setAssigneeTableFilter(value);
        break;
      case 'dueDate':
        setDueDateTableFilter(value);
        break;
      case 'committedDate':
        setCommittedDateTableFilter(value);
        break;
      case 'approvedDate':
        setApprovedDateTableFilter(value);
        break;
      default:
        break;
    }
  }, []);

  const handleClearAllFilters = () => {
    setPersonFilter('');
    setDateFilter('All');
    setSortBy('dueDateNewest');
    setSearchTerm('');
    setDateRange([null, null]);
    setTempDateRange([null, null]);
    setBadgeTableFilter('');
    setCommitmentTextTableFilter('');
    setAssigneeTableFilter('');
    setDueDateTableFilter(null);
    setCommittedDateTableFilter(null);
    setApprovedDateTableFilter(null);
  };

  const handleToggleExpandRow = (id: number) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const expandableCommitmentIds = currentItems
    .filter(c => (c.type === 'nudge' && c.responses && c.responses.length > 0) || ((isMyBadgesTab || isBadgesIssuedTab) && c.explanation))
    .map(c => c.id);

  const expandedCount = expandedRows.size;
  const totalExpandable = expandableCommitmentIds.length;

  let expandAllState: 'collapsed' | 'expanded' | 'indeterminate' = 'collapsed';
  if (expandedCount === 0) {
    expandAllState = 'collapsed';
  } else if (expandedCount === totalExpandable && totalExpandable > 0) {
    expandAllState = 'expanded';
  } else if (expandedCount > 0) {
    expandAllState = 'indeterminate';
  }

  const handleToggleExpandAll = () => {
    if (expandAllState === 'expanded') {
      setExpandedRows(new Set());
    } else {
      setExpandedRows(new Set(expandableCommitmentIds));
    }
  };

  let expandAllIcon;
  let expandAllLabel = '';

  switch (expandAllState) {
    case 'expanded':
      expandAllIcon = <KeyboardArrowUp fontSize="small" />;
      expandAllLabel = 'Collapse All';
      break;
    case 'indeterminate':
      expandAllIcon = <Remove fontSize="small" />;
      expandAllLabel = 'Some Expanded';
      break;
    case 'collapsed':
    default:
      expandAllIcon = <KeyboardArrowDown fontSize="small" />;
      expandAllLabel = 'Expand All';
      break;
  }

  const tableBadgeOptions = [...new Set(commitments.map(item => item.title))];
  const tableAssigneeOptions = [...new Set(commitments.map(item => item.assignee))];

  return (
    <>
      <Paper sx={{
        p: 3,
        height: 'auto',
        minHeight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#ffffff',
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e8eaed',
        mb: 4,
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: title.trim() === 'My Commitments' ? '#CC5500' : '#1976d2', fontSize: '1.25rem' }}>
            {title}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }} disabled={displayMode === 'table' || disableAllFiltersExceptSort}>
              <InputLabel>Person</InputLabel>
              <Select value={personFilter} onChange={(e) => setPersonFilter(e.target.value as string)} label="Person" startAdornment={<InputAdornment position="start"><Person fontSize="small" sx={{ color: (displayMode === 'table' || disableAllFiltersExceptSort) ? 'action.disabled' : 'text.secondary' }} /></InputAdornment>}>
                <MenuItem value="">All</MenuItem>
                {filterOptions.map(person => (
                  <MenuItem key={person} value={person}>{person}</MenuItem>
                ))}
                {hasExternal && <MenuItem value="External">External</MenuItem>}
              </Select>
            </FormControl>

            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }} disabled={displayMode === 'table' || disableAllFiltersExceptSort}>
              <InputLabel>Due Date</InputLabel>
              <Select
                value={dateFilter}
                onChange={handleDateFilterChange}
                label="Due Date"
                startAdornment={
                  <InputAdornment position="start">
                    <CalendarToday fontSize="small" sx={{ color: (displayMode === 'table' || disableAllFiltersExceptSort) ? 'action.disabled' : 'text.secondary' }} />
                  </InputAdornment>
                }
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Today">Today</MenuItem>
                <MenuItem value="This Week">This Week</MenuItem>
                <MenuItem value="Custom Range">Custom Range</MenuItem>
              </Select>
            </FormControl>

            {dateFilter === 'Custom Range' && (
              <TextField
                variant="outlined"
                size="small"
                value={
                  dateRange[0] && dateRange[1]
                    ? `${dateRange[0].format('MMM D')} - ${dateRange[1].format('MMM D, YYYY')}`
                    : 'Select Range'
                }
                onClick={handleCustomRangeClick}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ minWidth: 180, cursor: 'pointer' }}
                disabled={displayMode === 'table' || disableAllFiltersExceptSort}
              />
            )}

            <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Sort By</InputLabel>
              <Select value={sortBy} onChange={(e) => setSortBy(e.target.value as string)} label="Sort By" startAdornment={
                <InputAdornment position="start">
                  <ArrowUpward fontSize="small" sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              }>
                {isMyBadgesTab || isBadgesIssuedTab ? (
                  [
                    <MenuItem key="approvedDateNewest" value="approvedDateNewest">Approved Date (Newest First)</MenuItem>,
                    <MenuItem key="approvedDateOldest" value="approvedDateOldest">Approved Date (Oldest First)</MenuItem>,
                    <MenuItem key="committedDateNewest" value="committedDateNewest">Committed Date (Newest First)</MenuItem>,
                    <MenuItem key="committedDateOldest" value="committedDateOldest">Committed Date (Oldest First)</MenuItem>,
                    <MenuItem key="overdue" value="overdue">Overdue</MenuItem>,
                    <MenuItem key="nudges" value="nudges">Nudges</MenuItem>
                  ]
                ) : (
                  [
                    <MenuItem key="dueDateNewest" value="dueDateNewest">Due Date (Newest First)</MenuItem>,
                    <MenuItem key="dueDateOldest" value="dueDateOldest">Due Date (Oldest First)</MenuItem>,
                    <MenuItem key="committedDateNewest" value="committedDateNewest">Committed Date (Newest First)</MenuItem>,
                    <MenuItem key="committedDateOldest" value="committedDateOldest">Committed Date (Oldest First)</MenuItem>,
                    <MenuItem key="overdue" value="overdue">Overdue</MenuItem>,
                    <MenuItem key="nudges" value="nudges">Nudges</MenuItem>
                  ]
                )}
              </Select>
            </FormControl>

            <TextField variant="outlined" size="small" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }} />
          </Box>
        </Box>

        <Popover
          open={Boolean(popoverAnchor)}
          anchorEl={popoverAnchor}
          onClose={handleClosePopover}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <DateCalendar
            value={tempDateRange[0]}
            onChange={handleDateChange}
            slotProps={{
              day: (ownerState) => {
                const { day, outsideCurrentMonth } = ownerState as any;
                const [start, end] = tempDateRange;

                const isStartDate = start?.isSame(day as Dayjs, 'day') ?? false;
                const isEndDate = end?.isSame(day as Dayjs, 'day') ?? false;
                const isInRange = start && end ? (day as Dayjs).isBetween(start, end, null, '()') : false;
                const isRangeBoundary = isStartDate || isEndDate;

                const sx: SxProps<Theme> = {
                  borderRadius: '50%',
                  ...(isRangeBoundary && !outsideCurrentMonth && {
                    backgroundColor: 'primary.main',
                    color: 'common.white',
                    '&:hover, &:focus, &.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'common.white',
                    },
                  }),
                  ...(isInRange && !outsideCurrentMonth && {
                    backgroundColor: (theme) => alpha(theme.palette.primary.light, 0.3),
                    color: 'primary.dark',
                    borderRadius: '50%',
                  }),
                };
                
                return { sx } as any;
              },
            }}
            sx={{ mb: -2 }}
          />
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            gap: 1,
            px: 2,
            pb: 1.5,
            pt: 0,
          }}>
            <Button 
              onClick={handleClearDateRange} 
              variant="text" 
              sx={{ 
                py: 0.75, 
                px: 2,
                color: 'text.secondary' 
              }}
            >
              Clear
            </Button>
            <Button 
              onClick={handleApplyDateRange} 
              variant="contained" 
              color="primary"
              sx={{
                py: 0.75,
                px: 6,
                fontWeight: 600,
              }}
            >
              Apply
            </Button>
          </Box>
        </Popover>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: 1, borderColor: 'divider', mb: 1 }}>
          <Tabs value={activeTab} onChange={(_: React.SyntheticEvent, newValue: number) => setActiveTab(newValue)} sx={{ '& .MuiTab-root': { textTransform: 'none', fontWeight: 600 }, '& .Mui-selected': { color: 'primary.main' } }}>
            {tabs.map((tab, _index) => <Tab key={_index} label={`${tab.label} (${tab.count})`} />)}
          </Tabs>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            {totalExpandable > 0 && (
              <Button
                size="small"
                startIcon={expandAllIcon}
                onClick={handleToggleExpandAll}
                sx={{ textTransform: 'none', color: 'text.secondary', mr: 1 }}
              >
                {expandAllLabel}
              </Button>
            )}
            {onToggleDisplayMode && (
              <FormControlLabel
                control={
                  <Switch
                    checked={displayMode === 'table'}
                    onChange={() => onToggleDisplayMode(displayMode === 'table' ? 'regular' : 'table')}
                    sx={{
                      '& .MuiSwitch-switchBase': {
                        color: '#ff7043',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#1976d2',
                      },
                      '& .MuiSwitch-track': {
                        backgroundColor: '#e0e0e0',
                      },
                      '& .MuiSwitch-thumb': {
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      },
                    }}
                  />
                }
                label={displayMode === 'table' ? 'Table Mode' : 'Regular Mode'}
                labelPlacement="start"
                sx={{ m: 0 }}
              />
            )}
            {showClearAllFilters && (
              <Button
                onClick={handleClearAllFilters}
                sx={{
                  textTransform: 'capitalize',
                  color: 'grey.600',
                  textDecoration: 'underline',
                  p: 0,
                  '&:hover': {
                    textDecoration: 'underline',
                    bgcolor: 'transparent',
                    color: 'grey.800',
                  },
                }}
              >
                Clear All Filters
              </Button>
            )}
          </Box>
        </Box>

        {showBulkActionsSection && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2, mb: 1, flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Checkbox
                size="small"
                sx={{ p: 0 }}
                checked={selectAll}
                onChange={handleToggleSelectAll}
                indeterminate={selectedCount > 0 && selectedCount < currentItems.filter(i => !(isMyPromisesTab && i.type === 'nudge') && !isActivePromisesTab).length}
              />
              <Typography variant="body2" sx={{ color: '#666' }}>{selectedCount} commitment{selectedCount !== 1 ? 's' : ''} selected</Typography>
              
              {showBulkRequest && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => setBulkRequestModalOpen(true)}
                  sx={{
                    bgcolor: '#ff7043',
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    '&:hover': { bgcolor: '#f4511e' },
                  }}
                >
                  Bulk Request
                </Button>
              )}

              {showBulkClarify && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => setBulkClarifyModalOpen(true)}
                  sx={{
                    bgcolor: '#1976d2',
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    px: 3,
                    '&:hover': { bgcolor: '#1565c0' },
                  }}
                >
                  Clarify
                </Button>
              )}

              {showBulkRevoke && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => setBulkRevokeModalOpen(true)}
                  sx={{
                    bgcolor: '#F44336',
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    '&:hover': { bgcolor: '#d32f2f' },
                  }}
                >
                  Revoke
                </Button>
              )}

              {selectedCount > 0 && isRequestsToCommitTab && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<Check />}
                    onClick={handleBulkAccept}
                    sx={{ 
                      bgcolor: '#4CAF50',
                      color: 'white',
                      textTransform: 'none',
                      '&:hover': { bgcolor: '#388e3c' }
                    }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<Close />}
                    onClick={() => setBulkDeclineModalOpen(true)}
                    sx={{ 
                      bgcolor: '#F44336',
                      color: 'white',
                      textTransform: 'none',
                      '&:hover': { bgcolor: '#d32f2f' }
                    }}
                  >
                    Decline
                  </Button>
                </Box>
              )}

              {selectedCount > 0 && isBadgeRequestsTab && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<Check />}
                    onClick={() => setBulkApproveModalOpen(true)}
                    sx={{ 
                      bgcolor: '#4CAF50',
                      color: 'white',
                      textTransform: 'none',
                      '&:hover': { bgcolor: '#388e3c' }
                    }}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<Close />}
                    onClick={() => setBulkRejectModalOpen(true)}
                    sx={{ 
                      bgcolor: '#F44336',
                      color: 'white',
                      textTransform: 'none',
                      '&:hover': { bgcolor: '#d32f2f' }
                    }}
                  >
                    Reject
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        )}

        <Box sx={{ 
          height: containerContentHeight,
          minHeight: 0,
          pr: displayMode === 'table' ? 0 : 1,
          overflowY: displayMode === 'table' ? 'visible' : 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: paginatedItems.length === 0 ? 'center' : 'flex-start',
          alignItems: paginatedItems.length === 0 ? 'center' : 'stretch',
        }}>
          {displayMode === 'table' ? (
            <Box sx={{ mt: 2 }}>
              <CommitmentsTable
                commitments={currentItems}
                filters={{
                  badge: badgeTableFilter,
                  commitmentText: commitmentTextTableFilter,
                  assignee: assigneeTableFilter,
                  dueDate: dueDateTableFilter,
                  committedDate: committedDateTableFilter,
                  approvedDate: approvedDateTableFilter,
                }}
                onFilterChange={handleTableFilterChange}
                badgeOptions={tableBadgeOptions}
                assigneeOptions={tableAssigneeOptions}
                isMyBadgesTab={isMyBadgesTab}
                isBadgesIssuedTab={isBadgesIssuedTab}
                isUnkeptTab={isUnkeptTab}
                itemColor={itemColor}
                expandedRows={expandedRows}
                onToggleExpand={handleToggleExpandRow}
              />
            </Box>
          ) : (
            <Stack spacing={1} sx={{ width: '100%', mt: 1 }}>
              {paginatedItems.length > 0 ? (
                paginatedItems.map((item, _index) => {
                  const isNudgeItem = item.type === 'nudge';
                  const showCheckboxes = isActionsPage && !isMyBadgesTab && !isUnkeptTab;
                  const isCheckboxDisabled = isActionsPage ? (isMyPromisesTab && isNudgeItem) : isActivePromisesTab; 
                  
                  const hideDueDate = isRequestsToCommitTab || isAwaitingResponseTab || isBadgeRequestsTab;
                  const showRevokeButton = isAwaitingResponseTab;
                  
                  let showOriginalActionButton = false;
                  let originalButtonText = '';
                  let originalOnActionButtonClick = () => {};

                  if (isNudgeItem && isMyPromisesTab) {
                    showOriginalActionButton = true;
                    originalButtonText = 'Answer Nudge';
                    originalOnActionButtonClick = () => handleAnswerNudge(item);
                  } else if (!isMyBadgesTab && !isUnkeptTab && !isRequestsToCommitTab && !isAwaitingResponseTab && !isBadgeRequestsTab && !isOwedToMe) {
                      showOriginalActionButton = true;
                      originalButtonText = 'Request Badge';
                      originalOnActionButtonClick = handleRequestBadge;
                  }

                  const showClarifyButtonForListItem = isOwedToMe;

                  const showAcceptDeclineButtonsForListItem = isRequestsToCommitTab || isBadgeRequestsTab || isOwedToMe;

                  let onAcceptHandler = () => {};
                  let onDeclineHandler = () => {};
                  let acceptBtnText = undefined;
                  let declineBtnText = undefined;

                  if (isBadgeRequestsTab) {
                    onAcceptHandler = () => handleApproveBadgeRequest(item);
                    onDeclineHandler = () => handleRejectBadgeRequest(item);
                    acceptBtnText = 'Approve';
                    declineBtnText = 'Reject';
                  } else if (isRequestsToCommitTab || isOwedToMe) {
                    onAcceptHandler = () => handleAcceptClick(item);
                    onDeclineHandler = () => handleDeclineClick(item);
                    if (isOwedToMe) {
                      acceptBtnText = 'Approve';
                      declineBtnText = 'Reject';
                    }
                  }

                  const showFromLabel = isRequestsToCommitTab || isOwedToMe || isBadgeRequestsTab || isUnkeptTab;

                  return (
                    <CommitmentListItem
                      key={item.id}
                      {...item}
                      ref={_index === 0 ? firstItemRef : null}
                      color={itemColor}
                      showCheckbox={showCheckboxes}
                      isCheckboxDisabled={isCheckboxDisabled}
                      showActionButton={showOriginalActionButton}
                      buttonText={originalButtonText}
                      onActionButtonClick={originalOnActionButtonClick}
                      showClarifyButton={showClarifyButtonForListItem}
                      showAcceptDeclineButtons={showAcceptDeclineButtonsForListItem}
                      onAccept={onAcceptHandler}
                      onDecline={onDeclineHandler}
                      acceptButtonText={acceptBtnText}
                      declineButtonText={declineBtnText}
                      isBulkSelecting={selectedCount > 0}
                      hideDueDate={hideDueDate}
                      isNudge={isNudgeItem}
                      nudgesLeft={item.nudgesLeft}
                      totalNudges={item.totalNudges}
                      isMyPromisesTab={isMyPromisesTab}
                      isMyBadgesTab={isMyBadgesTab}
                      isBadgesIssuedTab={isBadgesIssuedTab}
                      isExternal={item.isExternal}
                      isOverdue={item.isOverdue}
                      showRevokeButton={showRevokeButton}
                      onRevoke={() => handleRevokeClick(item)}
                      showFromLabel={showFromLabel}
                      explanation={item.explanation}
                      responses={item.responses}
                      showBadgePlaceholder={isMyBadgesTab || isActivePromisesTab || isBadgesIssuedTab || isOwedToMe}
                      approvedDate={item.approvedDate}
                      isExpanded={expandedRows.has(item.id)}
                      onToggleExpand={() => handleToggleExpandRow(item.id)}
                      isActionsPage={isActionsPage}
                      isOthersCommitmentsSection={isOthersCommitmentsSection}
                      onViewDetails={() => handleViewCommitmentDetails(item)}
                      onToggleSelect={handleToggleSelectItem}
                    />
                  );
                })
              ) : (
                <Box sx={{ 
                  textAlign: 'center', 
                  color: 'text.secondary', 
                  width: '100%',
                  flex: 1,
                  display: 'flex', 
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Nothing here yet.</Typography>
                  <Typography variant="body1" sx={{ mb: 3, maxWidth: '80%', mx: 'auto' }}>We couldn’t find any commitments that match your filters. Try changing them or create something new.</Typography>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: isOthersCommitmentsSection ? 'primary.main' : '#ff7043',
                      color: 'white',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      fontSize: '16px',
                      '&:hover': { 
                        bgcolor: isOthersCommitmentsSection ? 'primary.dark' : '#f4511e',
                      },
                    }}
                    onClick={() => handleOpenMakePromiseModal(isOthersCommitmentsSection ? 'request' : 'promise')}
                  >
                    {isOthersCommitmentsSection ? 'Request a Commitment' : 'Make a Promise'}
                  </Button>
                </Box>
              )}
            </Stack>
          )}
        </Box>
      </Paper>

      <CommitmentDetailsModal 
        open={modalOpen} 
        onClose={handleCloseDetailsModal} 
        commitment={commitmentForDetails}
        isRequest={isRequestsToCommitTab}
        onAcceptRequestClick={handleAcceptFromDetails}
        onDeclineRequestClick={handleDeclineFromDetails}
        onRequestBadgeClick={handleRequestBadgeFromDetails}
        isAwaitingResponse={isAwaitingResponseTab}
        isOwedToMe={isOwedToMe}
        onRevokeClick={handleRevokeFromDetails}
        onClarifyClick={handleClarifyFromDetails}
        isCommitmentPortfolioPage={isCommitmentPortfolioPage}
      />
      <NudgeDetailsModal
        open={nudgeDetailsModalOpen}
        onClose={handleCloseNudgeDetailsModal}
        commitment={commitmentForNudgeDetails}
        onAnswerNudgeClick={handleAnswerNudgeFromDetails}
        isRequest={isRequestsToCommitTab}
        onAcceptClick={handleAcceptNudgeFromDetails}
        onDeclineClick={handleDeclineNudgeFromDetails}
      />
      <BadgeRequestDetailsModal
        open={badgeRequestDetailsModalOpen}
        onClose={handleCloseBadgeRequestDetailsModal}
        commitment={commitmentForBadgeRequest}
        onApprove={() => {
          if (commitmentForBadgeRequest) handleApproveBadgeRequest(commitmentForBadgeRequest);
          handleCloseBadgeRequestDetailsModal();
        }}
        onReject={() => {
          if (commitmentForBadgeRequest) handleRejectBadgeRequest(commitmentForBadgeRequest);
          handleCloseBadgeRequestDetailsModal();
        }}
      />
      <RequestBadgeModal open={requestBadgeModalOpen} onClose={handleCloseRequestBadgeModal} />
      <BulkRequestBadgeModal
        open={bulkRequestModalOpen}
        onClose={handleCloseBulkRequestModal}
        commitments={selectedCommitments}
        isOwedToMe={isOwedToMe}
      />
      <MyBadgeDetailsModal
        open={badgeDetailsModalOpen}
        onClose={handleCloseBadgeDetailsModal}
        badge={selectedBadge ? {
          title: selectedBadge.title,
          approvalDate: selectedBadge.approvedDate || 'N/A',
          originalDueDate: selectedBadge.dueDate,
          commitment: selectedBadge.description,
          recipient: selectedBadge.assignee,
          committedDate: selectedBadge.committedDate,
        } : null}
      />
      <AcceptRequestModal
        open={acceptModalOpen}
        onClose={handleCloseAcceptModal}
        onCommit={handleCommit}
        commitmentDescription={commitmentToAccept?.description || ''}
      />
      <AcceptNudgeModal
        open={acceptNudgeModalOpen}
        onClose={handleCloseAcceptNudgeModal}
        onCommit={handleCommit}
        commitmentDescription={commitmentToAccept?.description || ''}
      />
      <DeclineModal
        open={bulkDeclineModalOpen}
        onClose={handleCloseBulkDeclineModal}
        title="Decline Invitations"
        description={
          <Typography variant="body1" sx={{ mb: 4 }}>
            {`Are you sure you want to decline ${selectedCount} selected invitation${selectedCount > 1 ? 's' : ''}? This action cannot be undone.`}
          </Typography>
        }
        onDecline={handleConfirmBulkDecline}
      />
      <DeclineModal
        open={individualDeclineModalOpen}
        onClose={handleCloseIndividualDeclineModal}
        title="Decline Invitation"
        description={
          <Typography variant="body1" sx={{ mb: 4 }}>
            Are you sure you want to decline this invitation? This action cannot be undone.
          </Typography>
        }
        onDecline={handleConfirmIndividualDecline}
      />
      <DeclineModal
        open={revokeModalOpen}
        onClose={handleCloseRevokeModal}
        title="Revoke Request"
        description={
          <Typography variant="body1" sx={{ mb: 4 }}>
            Are you sure you want to revoke this commitment request? This action cannot be undone.
          </Typography>
        }
        onDecline={handleConfirmRevoke}
        declineText="Revoke"
      />
      <DeclineModal
        open={bulkRevokeModalOpen}
        onClose={handleCloseBulkRevokeModal}
        title="Bulk Revoke"
        description={
          <Typography variant="body1" sx={{ mb: 4 }}>
            {`Are you sure you want to revoke ${selectedCount} selected request${selectedCount > 1 ? 's' : ''}? This action cannot be undone.`}
          </Typography>
        }
        onDecline={handleConfirmBulkRevoke}
        declineText="Revoke"
      />
      <RequestClarificationModal
        open={clarifyModalOpen}
        onClose={handleCloseClarifyModal}
        notification={commitmentToClarify}
        onSend={handleSendClarification}
      />
      <BulkClarifyModal
        open={bulkClarifyModalOpen}
        onClose={handleCloseBulkClarifyModal}
        commitments={selectedCommitments}
      />
      <BulkAcceptModal
        open={bulkAcceptModalOpen}
        onClose={handleCloseBulkAcceptModal}
        commitments={selectedCommitments}
      />
      <AnswerNudgeModal
        open={answerNudgeModalOpen}
        onClose={handleCloseAnswerNudgeModal}
        commitment={commitmentForAnswerNudge}
      />
      <SuccessConfirmationModal
        open={approvalModalOpen}
        onClose={handleCloseApprovalModal}
        title="Badge Approved!"
        message={requesterForApproval ? `${requesterForApproval} has been notified.` : 'The user has been notified.'}
      />
      <SuccessConfirmationModal
        open={bulkApprovalSuccessOpen}
        onClose={() => setBulkApprovalSuccessOpen(false)}
        title="Badges Approved!"
        message={`${selectedCount} ${selectedCount === 1 ? 'person has' : 'people have'} been notified.`}
      />
      <SuccessConfirmationModal
        open={showClarificationSuccessModal}
        onClose={handleCloseClarificationSuccessModal}
        title="Request Sent!"
        message="The clarification request has been sent."
      />
      <DeclineModal
        open={rejectBadgeModalOpen}
        onClose={handleCloseRejectBadgeModal}
        title="Reject Badge Request"
        description={
          <Typography variant="body1" sx={{ mb: 4 }}>
            Are you sure you want to reject this badge request? The sender will be notified.
          </Typography>
        }
        onDecline={handleConfirmRejectBadge}
      />
      <ConfirmationModal
        open={bulkApproveModalOpen}
        onClose={() => setBulkApproveModalOpen(false)}
        title="Bulk Approve Requests"
        description={
          <Typography variant="body1" sx={{ mb: 4, color: '#333', fontSize: '16px', lineHeight: 1.6 }}>
            {`Are you sure you want to approve ${selectedCount} selected badge request${selectedCount > 1 ? 's' : ''}?`}
          </Typography>
        }
        onConfirm={handleConfirmBulkApprove}
        confirmText="Approve"
        confirmColor="success"
      />
      <ConfirmationModal
        open={bulkRejectModalOpen}
        onClose={() => setBulkRejectModalOpen(false)}
        title="Bulk Reject Requests"
        description={
          <Typography variant="body1" sx={{ mb: 4, color: '#333', fontSize: '16px', lineHeight: 1.6 }}>
            {`Are you sure you want to reject ${selectedCount} selected badge request${selectedCount > 1 ? 's' : ''}?`}
          </Typography>
        }
        onConfirm={handleConfirmBulkReject}
        confirmText="Reject"
        confirmColor="error"
      />

      <CommitmentActionModal
        open={makePromiseModalOpen}
        onClose={handleCloseMakePromiseModal}
        type={makePromiseModalType}
      />
    </>
  );
};

export default CommitmentsSection;