import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const dbPath = path.resolve(__dirname, '../../db.json'); 

export const ping = (req: Request, res: Response) => {
  res.send('Ping successful');
};


export const submit = (req: Request, res: Response) => {
  const { Name, Email, Phone, GitHubLink } = req.body;

  if (!Name || !Email || !Phone || !GitHubLink) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newSubmission = {
    Name,
    Email,
    Phone,
    GitHubLink,
  };

  try {
    const submissionsData = fs.readFileSync(dbPath, 'utf8');
    const submissions: any[] = JSON.parse(submissionsData);
    submissions.push(newSubmission);
    fs.writeFileSync(dbPath, JSON.stringify(submissions, null, 2));
    res.status(201).json({ message: 'Submission successful', submission: newSubmission });
  } catch (error) {
    console.error('Error saving submission:', error);
    res.status(500).json({ error: 'Failed to submit. Please try again later.' });
  }
};

export const read = (req: Request, res: Response) => {
  const id = req.params.id; 

  try {
    const submissionsData = fs.readFileSync(dbPath, 'utf8');
    const submissions: any[] = JSON.parse(submissionsData);
    const submission = submissions.find((sub) => sub.id === id);

    if (submission) {
      res.status(200).json(submission);
    } else {
      res.status(404).json({ error: 'Submission not found' });
    }
  } catch (error) {
    console.error('Error fetching submission:', error);
    res.status(500).json({ error: 'Failed to fetch submission. Please try again later.' });
  }
};


export const readAll = (req: Request, res: Response) => {
  try {
    const submissionsData = fs.readFileSync(dbPath, 'utf8');
    const submissions: any[] = JSON.parse(submissionsData);
    res.status(200).json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Failed to fetch submissions. Please try again later.' });
  }
};
