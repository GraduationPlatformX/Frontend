import { Upload, FileText, Download, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { getGroups, getProjects, getSubmissions, STORAGE_KEYS } from '../services/mockData';
import { formatDate, formatFileSize } from '../lib/utils';
import { toast } from 'sonner';

export function SubmissionUpload() {
  const { user } = useAuth();
  const groups = getGroups();
  const projects = getProjects();
  const submissions = getSubmissions();

  const userGroup = groups.find(g => g.members.some(m => m.id === user?.id));
  const userProject = userGroup ? projects.find(p => p.groupId === userGroup.id) : null;
  const groupSubmissions = userGroup ? submissions.filter(s => s.groupId === userGroup.id) : [];

  const handleFileUpload = async (milestoneId: string) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf,.zip,.doc,.docx';
    
    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }

      const newSubmission = {
        id: `sub${Date.now()}`,
        milestoneId,
        groupId: userGroup!.id,
        fileName: file.name,
        fileUrl: URL.createObjectURL(file),
        fileSize: file.size,
        status: 'PENDING' as const,
        uploadedAt: new Date().toISOString(),
        comments: [],
      };

      const allSubmissions = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBMISSIONS) || '[]');
      const updated = [...allSubmissions, newSubmission];
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(updated));

      toast.success('File uploaded successfully!');
    };

    fileInput.click();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'success';
      case 'REJECTED':
        return 'error';
      case 'IN_REVIEW':
        return 'default';
      default:
        return 'secondary';
    }
  };

  if (!userProject) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">No project found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {userProject.milestones.map((milestone) => {
        const submission = groupSubmissions.find(s => s.milestoneId === milestone.id);
        
        return (
          <Card key={milestone.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{milestone.title}</CardTitle>
                  <CardDescription>{milestone.description}</CardDescription>
                </div>
                <Badge variant={submission ? getStatusColor(submission.status) : 'secondary'}>
                  {submission ? submission.status : 'No submission'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {submission ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">{submission.fileName}</p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(submission.fileSize)} • {formatDate(submission.uploadedAt)}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>

                  {submission.comments.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Feedback
                      </h4>
                      {submission.comments.map((comment) => (
                        <div key={comment.id} className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm font-medium mb-1">{comment.author}</p>
                          <p className="text-sm text-gray-700">{comment.text}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDate(comment.date)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-500 mb-4">No submission yet</p>
                  <Button onClick={() => handleFileUpload(milestone.id)}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload File
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

