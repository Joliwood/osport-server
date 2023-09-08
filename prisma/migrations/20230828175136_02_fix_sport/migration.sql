/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User_on_sport` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User_on_sport` table. All the data in the column will be lost.
  - Changed the type of `sport_id` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_sport_id_fkey";

-- DropForeignKey
ALTER TABLE "Sport_on_image" DROP CONSTRAINT "Sport_on_image_image_id_fkey";

-- DropForeignKey
ALTER TABLE "Sport_on_image" DROP CONSTRAINT "Sport_on_image_sport_id_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "sport_id",
ADD COLUMN     "sport_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User_on_sport" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_sport_id_fkey" FOREIGN KEY ("sport_id") REFERENCES "Sport"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Sport_on_image" ADD CONSTRAINT "Sport_on_image_sport_id_fkey" FOREIGN KEY ("sport_id") REFERENCES "Sport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sport_on_image" ADD CONSTRAINT "Sport_on_image_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
