from dataclasses import field
from rest_framework import serializers
from .models import Candidate

class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = '__all__'

class CreateCandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = ( 'name', 'phone_number', 'gender' )

