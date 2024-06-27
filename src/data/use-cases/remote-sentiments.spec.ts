import { HttpPostClientSpy } from "@/data/test";
import { RemoteSentiments } from "./remote-sentiments";
import { faker } from "@faker-js/faker";
import { mockSentiments, mockSentimentsResponse } from "@/domain/test";
import { InvalidCredentialsError } from "@/domain/errors";
import { HttpStatusCode } from "../protocols/http";
import { UnexpectedError } from "@/domain/errors";
import { SentimentsParams } from "@/domain/use-cases";
import { SentimentResponse } from "@/types";

interface SutTypes {
  sut: RemoteSentiments;
  httpPostClientSpy: HttpPostClientSpy<SentimentsParams, SentimentResponse>;
}

describe("RemoteSentiments", () => {
  const makeSut = (url: string = faker.internet.url()): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy<
      SentimentsParams,
      SentimentResponse
    >();
    const sut = new RemoteSentiments(url, httpPostClientSpy);

    return { sut, httpPostClientSpy };
  };

  it("should calls the HTTPPostClient with correct URL", () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);

    sut.postSentiments(mockSentiments());
    expect(httpPostClientSpy.url).toBe(url);
  });

  it("should calls the HTTPPostClient with correct URL", async () => {
    const { sut, httpPostClientSpy } = makeSut();

    const sentimentsParams = mockSentiments();
    await sut.postSentiments(sentimentsParams);

    expect(httpPostClientSpy.body).toEqual(sentimentsParams);
  });

  it("should throw InvalidCredentialsError if HttpPostClient returns 401", async () => {
    const { sut, httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    };

    const promise = sut.postSentiments(mockSentiments());

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  it("should throw UnexpectedError if HttpPostClient returns 400", async () => {
    const { sut, httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };

    const promise = sut.postSentiments(mockSentiments());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it("should throw UnexpectedError if HttpPostClient returns 404", async () => {
    const { sut, httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };

    const promise = sut.postSentiments(mockSentiments());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it("should throw UnexpectedError if HttpPostClient returns 500", async () => {
    const { sut, httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };

    const promise = sut.postSentiments(mockSentiments());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it("should return the sentiment response if HttpPostClient returns 200", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const sentiments = mockSentiments();
    const sentimentResponse = mockSentimentsResponse();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: sentimentResponse,
    };

    const httpResponse = await sut.postSentiments(sentiments);

    expect(httpResponse).toEqual(sentimentResponse);
  });
});
