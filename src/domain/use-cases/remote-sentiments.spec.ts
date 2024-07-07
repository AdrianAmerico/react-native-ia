import { useRemoteSentiments } from "./remote-sentiments";
import { mockSentiments, mockSentimentsResponse } from "@/domain/test";
import { HttpStatusCode } from "../../data/protocols/http";
import { renderHook } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react-native";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { API_URL } from "@env";
import { Sentiment } from "../sentiments/sentiments";
import { sentimentsList } from "../sentiments";

describe("RemoteSentiments", () => {
  const url = `${API_URL}`;

  const makeSut = () => {
    const axiosAdapter = new MockAdapter(axios);
    axiosAdapter.onPost(url).reply(HttpStatusCode.ok, mockSentimentsResponse());

    const sut = renderHook(() => useRemoteSentiments());

    return { sut, axiosAdapter };
  };

  it("should calls the HTTPPostClient with correct URL", async () => {
    const { sut, axiosAdapter } = makeSut();

    await waitFor(() => {
      sut.result.current.postSentiments(mockSentiments());
    });

    expect(axiosAdapter.history.post[0].url).toBe(url);
  });

  it("should verify the body of the request", async () => {
    const { sut, axiosAdapter } = makeSut();

    const sentimentsParams = mockSentiments();

    await waitFor(() => {
      sut.result.current.postSentiments(sentimentsParams);
    });

    expect(axiosAdapter.history.post[0].data).toBeInstanceOf(FormData);
  });

  it("should return an SentimentResponse if HttpPostClient returns 200", async () => {
    const { sut, axiosAdapter } = makeSut();
    const sentiments = mockSentiments();
    const httpResult = mockSentimentsResponse();

    axiosAdapter.onPost(url).reply(HttpStatusCode.ok, httpResult);

    await waitFor(async () => {
      await sut.result.current.postSentiments(sentiments);
    });

    expect(sut.result.current.score).toEqual(
      sentimentsList[httpResult.score_tag]
    );
  });
});
