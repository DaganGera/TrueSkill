from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, JSON
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="student")
    full_name = Column(String, nullable=True)
    domain = Column(String, nullable=True)
    experience = Column(Integer, default=0)
    skills = Column(JSON, default=[])            # Store as JSON list
    accessibility_needs = Column(JSON, default=[]) # Store as JSON list

    assessments = relationship("Assessment", back_populates="owner")
    submissions = relationship("Submission", back_populates="owner")

class Assessment(Base):
    __tablename__ = "assessments"

    id = Column(String, primary_key=True, index=True) # UUID
    user_id = Column(Integer, ForeignKey("users.id"))
    questions = Column(JSON, default=[])
    created_at = Column(String, nullable=True) # ISO Date string

    owner = relationship("User", back_populates="assessments")
    submissions = relationship("Submission", back_populates="assessment")

class Submission(Base):
    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True, index=True)
    assessment_id = Column(String, ForeignKey("assessments.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    answers = Column(JSON, default=[])
    result = Column(JSON, default={}) # The AI evaluation result
    
    owner = relationship("User", back_populates="submissions")
    assessment = relationship("Assessment", back_populates="submissions")
