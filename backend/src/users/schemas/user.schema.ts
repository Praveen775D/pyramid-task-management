import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, index: true })
  email!: string;

  @Prop({ required: true, default: "Dexter" })
  name!: string;

  @Prop({ required: true, default: "Designer" })
  title!: string;

  @Prop({ required: true, unique: true, index: true })
  username!: string;

  @Prop({
    required: true,
    enum: ["default", "dark", "slate"],
    default: "default",
  })
  theme!: "default" | "dark" | "slate";
}

export const UserSchema = SchemaFactory.createForClass(User);
