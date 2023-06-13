import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("result")
export class ResultCrawl {
  @PrimaryGeneratedColumn({
    name: "id",
    type: "integer",
  })
  id: number;

  @Column("varchar")
  pos: string;

  @Column("varchar")
  no: string;

  @Column("varchar")
  driver: string;

  @Column("varchar", { nullable: true })
  nationality: string;

  @Column("varchar")
  car: string;

  @Column("varchar")
  laps: string;

  @Column("varchar")
  retired: string;

  @Column("integer")
  pts: number;

  @Column("varchar")
  date: string;

  @Column("varchar")
  location: string;

  @Column("varchar")
  location_key: string;

  @Column("varchar")
  year: string;
}
