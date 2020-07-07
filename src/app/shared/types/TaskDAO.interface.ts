import { BaseCRUD } from './BaseCRUD.inteface';
import { TaskStatus } from '../../tasks/types/task-status.enum';
import { Observable } from 'rxjs';
import { Task } from '../../tasks/types/task.interface';


export interface TaskDAO extends BaseCRUD<Task> {
    updateTaskStatus(id: number, status: TaskStatus): Observable<Task>
}