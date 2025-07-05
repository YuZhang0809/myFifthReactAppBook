/**
 * @typedef {Object} Task
 * @property {string} id          - 唯一 ID
 * @property {string} title       - 任务标题
 * @property {string} [description] - 任务描述（可选）
 * @property {boolean} completed  - 是否已完成
 * @property {number} createdAt   - 创建时间戳（ms）
 * @property {number} updatedAt   - 最近更新时间戳（ms）
 * @property {number|null} [dueAt]  - 截止时间（可选）
 * @property {'low'|'medium'|'high'} [priority] - 优先级
 * @property {string[]} [tags]    - 任务标签
 */
