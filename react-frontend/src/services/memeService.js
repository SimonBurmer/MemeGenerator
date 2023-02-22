import APIUtils from "../helpers.js/APIUtils";
import axios from "axios";

class MemeService {
  async getMemeById(memeId) {
    try {
      const response = await axios.get(
        APIUtils.getURL() + "/memes/getSingle?id=" + memeId,
        APIUtils.getAuthHeader()
      );
      console.log("Get One Meme: " + response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllMemes() {
    let response = await axios.get(
      APIUtils.getURL() + "/memes/all",
      APIUtils.getAuthHeader()
    );
    console.log("Get All Memes: " + response.data.length);
    return response.data;
  }

  // TODO
  async getAllMemesFromUser(userId) {
    console.log("Get All Memes from one User");
  }

  // TODO
  async getMemeCreatorById(creatorId) {
    try {
      console.log("Get Meme Creator by creatorId");
    } catch (error) {
      console.error(error);
    }
  }

  // takes in the memeId and the fields that should be updated, e.g. new Votes or Comments
  async updateMemeById(memeId, updatedFields) {
    try {
      const response = await axios.patch(
        APIUtils.getURL() + "/memes/update?id=" + memeId,
        updatedFields,
        APIUtils.getAuthHeader()
      );
      console.log("Updated Meme");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async publishMeme(
    formData,
    titel,
    userID,
    accessibility,
    templates,
    texts,
    canvasWidth,
    canvasHeight
  ) {
    let response = await axios({
      url: APIUtils.getURL() + "/img/upload?type=meme",
      method: "POST",
      headers: APIUtils.getAuthHeader(),
      data: formData,
    })
      .then(function (response) {
        var data = JSON.stringify({
          memeURL: "http://localhost:5000/img/meme/" + response.data.message[0],
          creatorId: userID,
          title: titel,
          accessibility: accessibility,
          templates: templates,
          texts: texts,
          canvasWidth: canvasWidth,
          canvasHeight: canvasHeight,
        });
        axios({
          method: "post",
          maxBodyLength: Infinity,
          url: "http://localhost:5000/memes/save",
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        })
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
        console.log(data);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }

  // HELPERS
  // votes a meme and returns the previous votingtype to create an alert to let the user know, he already voted this type (like/dislike)
  async voteOnMeme(memeId, voteType) {
    try {
      const votedMeme = await this.getMemeById(memeId);
      const userId = "123";
      const userHasVoted = votedMeme.votes.some(
        (vote) => vote.userId === userId
      );
      console.log("Previous Vote Length:  " + votedMeme.votes.length);
      let updatedVotes = [];
      let previousVotingType = "";
      if (userHasVoted) {
        updatedVotes = votedMeme.votes.map((vote) => {
          if (vote.userId === userId) {
            previousVotingType = vote.votingType;
            return {
              ...vote,
              votingType: voteType,
              votingDate: new Date().toISOString(),
            };
          }
          return vote;
        });
        console.log(
          "The User already voted the meme and therefore only updated his last vote. The number of votes keeps the same: " +
            updatedVotes.length
        );
      } else {
        updatedVotes = [
          ...votedMeme.votes,
          {
            userId: userId,
            votingType: voteType,
            votingDate: new Date().toISOString(),
          },
        ];
        console.log(
          "The User hasn't voted the meme yet and therefore the number of votes increases: " +
            updatedVotes.length
        );
      }
      await this.updateMemeById(memeId, { votes: updatedVotes });
      return previousVotingType;
    } catch (error) {
      console.error(error);
    }
  }
}

export default MemeService;
