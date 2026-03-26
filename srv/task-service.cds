using { taskflow } from '../db/schema';

service TaskService {
    entity Tasks         as projection on taskflow.Tasks;
    // Expostos como read-only — só servem para popular dropdowns
    @readonly entity StatusValues   as projection on taskflow.StatusValues;
    @readonly entity PriorityValues as projection on taskflow.PriorityValues;
}