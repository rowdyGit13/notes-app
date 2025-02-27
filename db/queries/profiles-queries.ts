import { eq } from "drizzle-orm";
import { db } from "../db";
import { profilesTable, InsertProfile, SelectProfile } from "../schema/profiles-schema";

// CREATE a profile.
//  create a function named createProfile that takes in argument named data of type InsertProfile
// use "try-catch" to handle errors
export const createProfile = async (data: InsertProfile) => {
    try{
        const [newProfile] = await db.insert(profilesTable).values(data).returning();
        return newProfile;
    } catch (error) {
        console.error("Error creating profile:", error);
        throw new Error("Failed to create profile");
    }
};

// READ. aka fetch a profile.
// create a function named getProfileByUserId that takes in argument named userId of type string
export const getProfileByUserId = async (userID: string) => {
    try {
      const profile = await db.query.profiles.findFirst({
        where: eq(profilesTable.userID, userID)
      });
  
      return profile;
    } catch (error) {
      console.error("Error getting profile by user ID:", error);
      throw new Error("Failed to get profile");
    }
  };
  
  export const getAllProfiles = async (): Promise<SelectProfile[]> => {
    return db.query.profiles.findMany();
  };
  
  // UPDATE a profile.
  // create a function named updateProfile that takes in argument named userID of type string and data of type Partial<InsertProfile>
  export const updateProfile = async (userID: string, data: Partial<InsertProfile>) => {
    try {
      const [updatedProfile] = await db.update(profilesTable).set(data).where(eq(profilesTable.userID, userID)).returning();
      return updatedProfile;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw new Error("Failed to update profile");
    }
  };
  
  export const updateProfileByStripeCustomerId = async (stripeCustomerID: string, data: Partial<InsertProfile>) => {
    try {
      const [updatedProfile] = await db.update(profilesTable).set(data).where(eq(profilesTable.stripeCustomerID, stripeCustomerID)).returning();
      return updatedProfile;
    } catch (error) {
      console.error("Error updating profile by stripe customer ID:", error);
      throw new Error("Failed to update profile");
    }
  };
  
  export const deleteProfile = async (userID: string) => {
    try {
      await db.delete(profilesTable).where(eq(profilesTable.userID, userID));
    } catch (error) {
      console.error("Error deleting profile:", error);
      throw new Error("Failed to delete profile");
    }
  };