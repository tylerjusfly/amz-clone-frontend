export const hasAccessToAdminTabs = (permissions) => {
  return permissions.find((p) => p === 'admin');
};

export const hasAccess = (userroles, allowedroles) => {
  return allowedroles.find((role) => userroles.includes(role));
};
