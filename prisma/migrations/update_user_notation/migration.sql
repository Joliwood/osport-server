-- AddForeignKey
ALTER TABLE "Event_chat_on_user"
ADD COLUMN "event_id" INTEGER,
ADD CONSTRAINT "Event_chat_on_user_event_id_fkey"
FOREIGN KEY ("event_id")
REFERENCES "Event"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;
