export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      jobs_data: {
        Row: {
          advt_no: string | null
          created_at: string | null
          education_tags: Json | null
          exam_or_post_name: string
          experience_level_tags: Json | null
          is_active: boolean | null
          Is_All_India: boolean | null
          job_area_tags: Json | null
          job_id: string
          job_posting_deadline_tags: Json | null
          job_type_tags: Json | null
          last_date: string | null
          more_information: string | null
          page_link: string | null
          post_date: string
          post_position_tags: Json | null
          qualification: string | null
          raw_html_1: string | null
          raw_html_2: string | null
          raw_html_3: string | null
          recruitment_board: string
          state: string | null
          total_posts: number | null
          updated_at: string | null
        }
        Insert: {
          advt_no?: string | null
          created_at?: string | null
          education_tags?: Json | null
          exam_or_post_name: string
          experience_level_tags?: Json | null
          is_active?: boolean | null
          Is_All_India?: boolean | null
          job_area_tags?: Json | null
          job_id?: string
          job_posting_deadline_tags?: Json | null
          job_type_tags?: Json | null
          last_date?: string | null
          more_information?: string | null
          page_link?: string | null
          post_date: string
          post_position_tags?: Json | null
          qualification?: string | null
          raw_html_1?: string | null
          raw_html_2?: string | null
          raw_html_3?: string | null
          recruitment_board: string
          state?: string | null
          total_posts?: number | null
          updated_at?: string | null
        }
        Update: {
          advt_no?: string | null
          created_at?: string | null
          education_tags?: Json | null
          exam_or_post_name?: string
          experience_level_tags?: Json | null
          is_active?: boolean | null
          Is_All_India?: boolean | null
          job_area_tags?: Json | null
          job_id?: string
          job_posting_deadline_tags?: Json | null
          job_type_tags?: Json | null
          last_date?: string | null
          more_information?: string | null
          page_link?: string | null
          post_date?: string
          post_position_tags?: Json | null
          qualification?: string | null
          raw_html_1?: string | null
          raw_html_2?: string | null
          raw_html_3?: string | null
          recruitment_board?: string
          state?: string | null
          total_posts?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      merge_raw_data: {
        Row: {
          advt_no: string | null
          created_at: string | null
          data_extract: string | null
          exam_post_name: string | null
          extract_time: string | null
          fingerprint: string | null
          ID: string
          last_date: string | null
          location: string | null
          more_information: string[] | null
          post_date: string | null
          qualification: string | null
          recruitment_board: string | null
          source: string | null
          state: string | null
          total_vacancy: string | null
        }
        Insert: {
          advt_no?: string | null
          created_at?: string | null
          data_extract?: string | null
          exam_post_name?: string | null
          extract_time?: string | null
          fingerprint?: string | null
          ID?: string
          last_date?: string | null
          location?: string | null
          more_information?: string[] | null
          post_date?: string | null
          qualification?: string | null
          recruitment_board?: string | null
          source?: string | null
          state?: string | null
          total_vacancy?: string | null
        }
        Update: {
          advt_no?: string | null
          created_at?: string | null
          data_extract?: string | null
          exam_post_name?: string | null
          extract_time?: string | null
          fingerprint?: string | null
          ID?: string
          last_date?: string | null
          location?: string | null
          more_information?: string[] | null
          post_date?: string | null
          qualification?: string | null
          recruitment_board?: string | null
          source?: string | null
          state?: string | null
          total_vacancy?: string | null
        }
        Relationships: []
      }
      news: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          short_description: string
          source_link: string | null
          time_updated: string
          title: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          short_description: string
          source_link?: string | null
          time_updated: string
          title: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          short_description?: string
          source_link?: string | null
          time_updated?: string
          title?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      preprocessing_job_data: {
        Row: {
          advt_no: string | null
          created_at: string | null
          data_extract: string | null
          education_tags: Json | null
          EmployerSectorTag: Json | null
          exam_post_name: string | null
          experience_level_tags: Json | null
          extract_time: string | null
          fingerprint: string | null
          id: string
          is_active: boolean | null
          Is_All_India: boolean | null
          job_area_tags: Json | null
          job_posting_deadline_tags: Json | null
          job_type_tags: Json | null
          last_date: string | null
          location: string | null
          more_information: string[] | null
          page_link: string | null
          post_date: string | null
          post_position_tags: Json | null
          qualification: string | null
          recruitment_board: string | null
          row_html_1: string | null
          row_html_2: string | null
          row_html_3: string | null
          source: string | null
          state: string | null
          total_vacancy: number | null
          updated_at: string | null
        }
        Insert: {
          advt_no?: string | null
          created_at?: string | null
          data_extract?: string | null
          education_tags?: Json | null
          EmployerSectorTag?: Json | null
          exam_post_name?: string | null
          experience_level_tags?: Json | null
          extract_time?: string | null
          fingerprint?: string | null
          id?: string
          is_active?: boolean | null
          Is_All_India?: boolean | null
          job_area_tags?: Json | null
          job_posting_deadline_tags?: Json | null
          job_type_tags?: Json | null
          last_date?: string | null
          location?: string | null
          more_information?: string[] | null
          page_link?: string | null
          post_date?: string | null
          post_position_tags?: Json | null
          qualification?: string | null
          recruitment_board?: string | null
          row_html_1?: string | null
          row_html_2?: string | null
          row_html_3?: string | null
          source?: string | null
          state?: string | null
          total_vacancy?: number | null
          updated_at?: string | null
        }
        Update: {
          advt_no?: string | null
          created_at?: string | null
          data_extract?: string | null
          education_tags?: Json | null
          EmployerSectorTag?: Json | null
          exam_post_name?: string | null
          experience_level_tags?: Json | null
          extract_time?: string | null
          fingerprint?: string | null
          id?: string
          is_active?: boolean | null
          Is_All_India?: boolean | null
          job_area_tags?: Json | null
          job_posting_deadline_tags?: Json | null
          job_type_tags?: Json | null
          last_date?: string | null
          location?: string | null
          more_information?: string[] | null
          page_link?: string | null
          post_date?: string | null
          post_position_tags?: Json | null
          qualification?: string | null
          recruitment_board?: string | null
          row_html_1?: string | null
          row_html_2?: string | null
          row_html_3?: string | null
          source?: string | null
          state?: string | null
          total_vacancy?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      row_unique_freejobalert: {
        Row: {
          advt_no: string | null
          created_at: string | null
          data_extract: string | null
          exam_post_name: string | null
          extract_time: string | null
          fingerprint: string | null
          ID: string
          last_date: string | null
          more_information: string
          post_date: string | null
          qualification: string | null
          recruitment_board: string | null
          state: string | null
          total_vacancy: string | null
        }
        Insert: {
          advt_no?: string | null
          created_at?: string | null
          data_extract?: string | null
          exam_post_name?: string | null
          extract_time?: string | null
          fingerprint?: string | null
          ID?: string
          last_date?: string | null
          more_information: string
          post_date?: string | null
          qualification?: string | null
          recruitment_board?: string | null
          state?: string | null
          total_vacancy?: string | null
        }
        Update: {
          advt_no?: string | null
          created_at?: string | null
          data_extract?: string | null
          exam_post_name?: string | null
          extract_time?: string | null
          fingerprint?: string | null
          ID?: string
          last_date?: string | null
          more_information?: string
          post_date?: string | null
          qualification?: string | null
          recruitment_board?: string | null
          state?: string | null
          total_vacancy?: string | null
        }
        Relationships: []
      }
      row_unique_mysarkarinaukri: {
        Row: {
          created_at: string | null
          data_extract: string | null
          exam_post_name: string | null
          extract_time: string | null
          fingerprint: string | null
          ID: string
          last_date: string | null
          location: string | null
          more_information: string
          state: string | null
          total_vacancy: string | null
        }
        Insert: {
          created_at?: string | null
          data_extract?: string | null
          exam_post_name?: string | null
          extract_time?: string | null
          fingerprint?: string | null
          ID?: string
          last_date?: string | null
          location?: string | null
          more_information: string
          state?: string | null
          total_vacancy?: string | null
        }
        Update: {
          created_at?: string | null
          data_extract?: string | null
          exam_post_name?: string | null
          extract_time?: string | null
          fingerprint?: string | null
          ID?: string
          last_date?: string | null
          location?: string | null
          more_information?: string
          state?: string | null
          total_vacancy?: string | null
        }
        Relationships: []
      }
      subscriber: {
        Row: {
          area_of_interest: string
          created_at: string
          email: string
          id: string
          name: string
          updated_at: string
          whatsapp_number: string
        }
        Insert: {
          area_of_interest: string
          created_at?: string
          email: string
          id?: string
          name: string
          updated_at?: string
          whatsapp_number: string
        }
        Update: {
          area_of_interest?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          updated_at?: string
          whatsapp_number?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      insert_freejobalert_bulk:
        | {
            Args: { p_records: Json }
            Returns: {
              inserted_count: number
              skipped_count: number
            }[]
          }
        | {
            Args: { jobs_data: Json[] }
            Returns: {
              total_duplicates: number
              total_inserted: number
              total_processed: number
            }[]
          }
      insert_job_ignore_duplicates:
        | {
            Args: { jobs_data: Json[] }
            Returns: {
              total_duplicates: number
              total_inserted: number
              total_processed: number
            }[]
          }
        | {
            Args: {
              p_exam_post_name: string
              p_job_data: Json
              p_last_date: string
              p_more_information: string
              p_recruitment_board: string
              p_state: string
            }
            Returns: {
              inserted: boolean
              job_id: string
            }[]
          }
      insert_jobs_batch:
        | {
            Args: { jobs_data: Json[] }
            Returns: {
              duplicate_count: number
              inserted_count: number
              inserted_job_ids: string[]
              total_processed: number
            }[]
          }
        | {
            Args: { freejobalert_data?: Json[]; mysarkarinaukri_data?: Json[] }
            Returns: {
              table_name: string
              total_duplicates: number
              total_inserted: number
              total_processed: number
            }[]
          }
      merge_unique_data: { Args: never; Returns: undefined }
      remove_duplicate_from_merge_raw_data: { Args: never; Returns: undefined }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
