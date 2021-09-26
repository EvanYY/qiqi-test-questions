/*
 * @Author: Evan
 * @Date: 2021-09-26 22:46:07
 * @Last Modified by:   yangyang
 * @Last Modified time: 2021-09-26 22:46:07
 */
export interface FormCell {
  resource: string
  operator: string
  value: string
}
export interface TreeNode {
  id: string
  type: string
  keys: FormCell[]
  grops: TreeNode[]
  level: number
  // parentId: string
}

export interface Selected {
  value: string
  label: string
}
