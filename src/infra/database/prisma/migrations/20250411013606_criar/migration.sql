-- CreateTable
CREATE TABLE "member" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "servername" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "lastoffline" DATETIME,
    "isguildmember" BOOLEAN NOT NULL,
    "lastcheckedguildmember" DATETIME
);

-- CreateIndex
CREATE UNIQUE INDEX "member_id_key" ON "member"("id");
