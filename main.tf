provider "aws" {
  region = "ap-southeast-2"
}

resource "aws_s3_bucket" "tf_state_bucket" {
  bucket = "mtwelli-tf-state"
  versioning {
      enabled = true
  }
}

resource "aws_s3_bucket" "gundb_bucket" {
  bucket = "mtwelli-gundb"
}
