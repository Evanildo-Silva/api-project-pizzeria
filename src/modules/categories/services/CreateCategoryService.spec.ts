import AppError from "@shared/errors/AppError";
import FakeCategoryRepository from "../domain/repositories/fakes/FakeCategoryRepository";
import CreateCategoryService from "./CreateCategoryService";

let fakeCategoryRepository: FakeCategoryRepository;
let createCategory: CreateCategoryService;

describe("CreateCategory", () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository();
    createCategory = new CreateCategoryService(fakeCategoryRepository);
  });

  it("should be able to create a new category", async () => {
    const category = await createCategory.execute({
      name: "Category Test",
    });

    expect(category).toHaveProperty("id");
  });

  it("should not be possible to create a new category if the category name is already used", async () => {
    await createCategory.execute({
      name: "Category Test",
    });

    expect(
      createCategory.execute({
        name: "Category Test",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
