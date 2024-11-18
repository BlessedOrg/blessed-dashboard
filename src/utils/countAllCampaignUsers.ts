export function countAllAudienceUsers(campaign: ICampaign) {
  const allUsers = campaign?.Audiences?.flatMap((audience) => audience.AudienceUsers) || [];

  return {
    count: allUsers.length,
    users: allUsers as IAudienceUser[]
  };
}

export function countAllUniqueAudienceUsers(campaign: ICampaign) {
  const uniqueUsersMap = new Map<string, any>();

  campaign?.Audiences?.forEach((audience) => {
    audience.AudienceUsers?.forEach((user) => {
      if (!uniqueUsersMap.has(user.id)) {
        uniqueUsersMap.set(user.id, user);
      }
    });
  });

  const uniqueUsers = Array.from(uniqueUsersMap.values());

  return {
    count: uniqueUsers.length,
    users: uniqueUsers as IAudienceUser[]
  };
}
