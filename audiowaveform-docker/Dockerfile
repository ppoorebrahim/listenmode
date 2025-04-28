FROM ubuntu:20.04

RUN apt-get update && apt-get install -y \
    cmake \
    g++ \
    libsndfile1-dev \
    libboost-program-options-dev \
    libboost-system-dev \
    libboost-filesystem-dev \
    git \
    make \
    wget

RUN git clone https://github.com/bbc/audiowaveform.git /opt/audiowaveform
WORKDIR /opt/audiowaveform
RUN cmake .
RUN make

ENTRYPOINT ["./audiowaveform"]
