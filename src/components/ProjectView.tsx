import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Project } from '../types';
import { formatDate } from '../lib/utils';

interface ProjectViewProps {
  project: Project;
}

export function ProjectView({ project }: ProjectViewProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      case 'IN_PROGRESS':
        return <Clock className="h-5 w-5 text-primary" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'success';
      case 'IN_PROGRESS':
        return 'default';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Badge variant={getStatusColor(project.status)}>
              {project.status}
            </Badge>
            <span className="text-sm text-gray-500">
              Progress: {project.progress}%
            </span>
          </div>
          <Progress value={project.progress} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Milestones</CardTitle>
          <CardDescription>
            Track your project progress through key milestones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {project.milestones.map((milestone, index) => (
              <div key={milestone.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  {getStatusIcon(milestone.status)}
                  {index < project.milestones.length - 1 && (
                    <div className="w-[2px] h-12 bg-gray-200 mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{milestone.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {milestone.description}
                      </p>
                    </div>
                    <Badge variant={getStatusColor(milestone.status)}>
                      {milestone.status}
                    </Badge>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                    <span>Due: {formatDate(milestone.dueDate)}</span>
                    {milestone.hasSubmission && (
                      <Badge variant="outline" className="text-xs">
                        Submitted
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

