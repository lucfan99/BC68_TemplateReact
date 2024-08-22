import { http } from "./config";

export const SkillService = {
  getAllSkill: () => {
    return http.get("/skill");
  },
};
