-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_sport_id_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "score_team_1" INTEGER,
ADD COLUMN     "score_team_2" INTEGER;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_sport_id_fkey" FOREIGN KEY ("sport_id") REFERENCES "Sport"("id") ON DELETE CASCADE ON UPDATE CASCADE;
