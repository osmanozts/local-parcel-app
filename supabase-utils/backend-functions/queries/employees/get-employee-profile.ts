import { Tables } from "@/supabase-utils/database-types";
import { supabaseClient } from "@/supabase-utils/supabase";
import { QueryData } from "@supabase/supabase-js";

export const singleEmployeeWithProfile = supabaseClient
  .from("employees")
  .select(
    `
*,
profile(*)
`
  )
  .single();

export type EmployeeWithProfile = QueryData<typeof singleEmployeeWithProfile>;

export async function getEmployeeProfile(
  id: string,
  callback?: (newEmployee: EmployeeWithProfile) => EmployeeWithProfile
) {
  const { data: employee, error } = await supabaseClient
    .from("employees")
    .select(
      `
      *,
      profile(*)
      `
    )
    .eq("profile_id", id)
    .single();

  if (error) throw error;
  if (callback) callback(employee);
  return employee;
}
