export type TreeNode = {
  name: string,
  children: TreeNode[],
  url?: string,
};

export function pathsToTree(paths: string[] = []) {
  const map: Record<string, string[]> = {};
  function addToMap(rawPath: string) {
    const path = rawPath.replace(/^\//, '').replace(/\/$/, '');
    const segments = path.split('/');
    const parent = segments.slice(0, -1).join('/');
    if (!map[parent]) map[parent] = [];
    if (!map[parent].includes(path)) map[parent] = [...map[parent], path];
    if (parent) addToMap(parent);
  }
  function buildTree(path: string): TreeNode {
    const name = path.split('/').pop() || 'Home';
    const url = path ? `/${path}/` : '/';
    return {
      name,
      url,
      children: map[path] ? map[path].map(buildTree) : [],
    };
  }
  if (Array.isArray(paths)) {
    paths.forEach(addToMap);
  }
  return buildTree('');
}
