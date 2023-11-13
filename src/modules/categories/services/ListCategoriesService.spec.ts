import FakeCategoryRepository from "../domain/repositories/fakes/FakeCategoryRepository";

let fakeCategoryRepository: FakeCategoryRepository;

describe("ListCategories", () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository();
  });

  it("should be able to return a list of categories", async () => {
    const categories = [
      "Category Test One",
      "Category Test Two",
      "Category Test Three",
    ];

    categories.map(category => {
      fakeCategoryRepository.create({
        name: category,
      });
    });

    const categoryList = await fakeCategoryRepository.findAll();

    expect(categoryList).toHaveLength(3);
    expect(categoryList[0].name).toBe("Category Test One");
    expect(categoryList[1].name).toBe("Category Test Two");
    expect(categoryList[2].name).toBe("Category Test Three");
  });
});
